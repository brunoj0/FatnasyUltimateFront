import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import {
  setEntities,
  updateAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Team } from './models/team.model';
import { computed, inject } from '@angular/core';
import { pipe } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  map,
} from 'rxjs/operators';
import { PlayerService } from './services/player.service';
import { Player } from './models/player.model';
import { PlayerStatsWebSocketService } from './services/player-stats-websocket.service';
import { PlayerStats } from './models/player-stats.model';

// State interface
interface PlayerState {
  isLoading: boolean;
  error: string | null;
  selectedPlayerId: number | null;
  isConnected: boolean;
}

// Initial state
const initialState: PlayerState = {
  isLoading: false,
  error: null,
  selectedPlayerId: null,
  isConnected: false,
};

// Utility functions
export const filterPlayers = (players: Player[], searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return players.filter(
    (player) =>
      player.firstName.toLowerCase().includes(term) ||
      player.lastName.toLowerCase().includes(term)
  );
};

export const PlayerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Player>(),

  // Computed selectors
  withComputed((store) => ({
    selectedPlayer: computed(() =>
      store.entities().find((player) => player.id === store.selectedPlayerId())
    ),
    status: computed(() => ({
      isLoading: store.isLoading(),
      error: store.error(),
      isConnected: store.isConnected(),
    })),
  })),

  // Methods
  withMethods((store) => {
    const playerService = inject(PlayerService);
    const wsService = inject(PlayerStatsWebSocketService);

    // Subscribe to WebSocket updates
    wsService.getStats().subscribe((stats: PlayerStats[]) => {
      const updatedPlayers = store.entities().map((player) => {
        const playerStats = stats.find((s) => s.playerId === player.id);
        if (playerStats) {
          return {
            ...player,
            points: playerStats.points,
            assists: playerStats.assists,
          };
        }
        return player;
      });
      patchState(store, setEntities(updatedPlayers));
    });

    // Subscribe to connection status
    wsService.getConnectionStatus().subscribe((isConnected) => {
      patchState(store, { isConnected });
    });

    return {
      loadPlayers: rxMethod<void>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() => {
            return playerService.loadPlayers().pipe(
              tapResponse({
                next: (players) => {
                  patchState(store, setEntities(players), { isLoading: false });
                },
                error: (error: Error) => {
                  console.error('Error loading players:', error);
                  patchState(store, {
                    isLoading: false,
                    error: error?.message || 'Failed to load players',
                  });
                },
              })
            );
          })
        )
      ),

      selectPlayer: (playerId: number) => {
        patchState(store, { selectedPlayerId: playerId });
      },

      clearSelection: () => {
        patchState(store, { selectedPlayerId: null });
      },

      updatePlayer: rxMethod<Partial<Player>>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((playerUpdate) => {
            return playerService.updatePlayer(playerUpdate as Player).pipe(
              tapResponse({
                next: (updatedPlayer) => {
                  patchState(
                    store,
                    updateAllEntities((entity) =>
                      entity.id === updatedPlayer.id
                        ? { ...entity, ...updatedPlayer }
                        : entity
                    ),
                    { isLoading: false }
                  );
                },
                error: (error: Error) => {
                  console.error('Error updating player:', error);
                  patchState(store, {
                    isLoading: false,
                    error: error?.message || 'Failed to update player',
                  });
                },
              })
            );
          })
        )
      ),

      transferPlayer: rxMethod<{ playerId: number; newTeamId: number }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ playerId, newTeamId }) => {
            const player = store.entities().find((p) => p.id === playerId);
            if (!player) {
              patchState(store, {
                error: 'Player not found',
                isLoading: false,
              });
              return [];
            }

            return playerService
              .updatePlayer({ ...player, teamId: newTeamId })
              .pipe(
                tapResponse({
                  next: (updatedPlayer) => {
                    patchState(
                      store,
                      updateAllEntities((entity) =>
                        entity.id === updatedPlayer.id ? updatedPlayer : entity
                      ),
                      { isLoading: false }
                    );
                  },
                  error: (error: Error) => {
                    patchState(store, {
                      isLoading: false,
                      error: error?.message || 'Failed to transfer player',
                    });
                  },
                })
              );
          })
        )
      ),
    };
  })
);
