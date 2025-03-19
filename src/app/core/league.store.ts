import {
  patchState,
  signalStore,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Player } from './models/player.model';
import {
  Formation,
  MAX_HANDLERS_HORIZONTAL_STACK,
  MAX_HANDLERS_VERTICAL_STACK,
  Position,
} from './models/formation.enum';
import { computed, inject } from '@angular/core';
import { withEntities } from '@ngrx/signals/entities';
import { Team } from './models/team.model';
import { PlayerStore } from './player.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

// State interfaces
interface LeagueState {
  formation: Formation;
  userTeamId: number;
  userTeamPlayersIds: number[];
  error: string | null;
}

// Initial state
const initialState: LeagueState = {
  formation: Formation.VerticalStack,
  userTeamId: 1,
  userTeamPlayersIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  error: null,
};

export const LeagueStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities({ entity: type<Team>(), collection: 'team' }),

  // Computed selectors
  withComputed((store) => {
    const playerStore = inject(PlayerStore);

    return {
      status: computed(() => ({
        isLoading: playerStore.status().isLoading,
        error: store.error(),
      })),
      userTeamPlayers: computed(() => {
        const players = playerStore.entities();
        return store
          .userTeamPlayersIds()
          .map((id) => players.find((player) => player.id === id))
          .filter((player): player is Player => player !== undefined);
      }),
    };
  }),

  withComputed((store) => {
    const playerStore = inject(PlayerStore);

    return {
      playersWithPosition: computed(() => {
        const teamPlayers = store
          .userTeamPlayers()
          .filter((player) => player.teamId === store.userTeamId());

        if (teamPlayers.length === 0) return [];

        const formationConfig = {
          [Formation.Hex]: () =>
            teamPlayers.map((player) => ({
              ...player,
              position: Position.Flex,
            })),
          [Formation.HorizontalStack]: () =>
            teamPlayers.map((player, index) => ({
              ...player,
              position:
                index < MAX_HANDLERS_HORIZONTAL_STACK
                  ? Position.Handler
                  : Position.Cutter,
            })),
          [Formation.VerticalStack]: () =>
            teamPlayers.map((player, index) => ({
              ...player,
              position:
                index < MAX_HANDLERS_VERTICAL_STACK
                  ? Position.Handler
                  : Position.Cutter,
            })),
        };

        return formationConfig[store.formation()]?.() || teamPlayers;
      }),
      playerWithAvailability: computed(() => {
        const players = playerStore.entities();
        return players.map((player) => ({
          ...player,
          availability:
            player.teamId === store.userTeamId()
              ? 'SAME_TEAM'
              : player.teamId
                ? 'TRANSFER'
                : 'AVAILABLE',
        }));
      }),
    };
  }),

  // Methods
  withMethods((store) => {
    const playerStore = inject(PlayerStore);

    return {
      changeFormation: (formation: Formation) => {
        patchState(store, { formation });
      },

      swapPlayers: (player1Id: number, player2Id: number) => {
        const players = [...store.userTeamPlayersIds()];
        const index1 = players.indexOf(player1Id);
        const index2 = players.indexOf(player2Id);

        if (index1 === -1 || index2 === -1) {
          patchState(store, {
            error: 'Invalid player IDs for swap operation',
          });
          return;
        }

        [players[index1], players[index2]] = [players[index2], players[index1]];
        patchState(store, {
          userTeamPlayersIds: players,
          error: null,
        });
      },

      loadTeamPlayers: rxMethod<void>(
        pipe(
          tap(() => {
            playerStore.loadPlayers();
          })
        )
      ),
    };
  })
);
