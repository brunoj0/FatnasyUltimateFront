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
import { PLAYERS } from 'src/mocks/players';
import { InjectionToken, computed, inject } from '@angular/core';
import { PlayerStore } from './player.store';
import { withEntities } from '@ngrx/signals/entities';
import { Team } from './models/team.model';
import { addPlayerAvailability } from '../shared/utls';

type TeamState = {
  formation: Formation;
  userTeamId: number;
  userTeamPlayersIds: number[];
};

const initialState: TeamState = {
  formation: Formation.VerticalStack,
  userTeamId: 1,
  userTeamPlayersIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};
export const LeagueStore = signalStore(
  { providedIn: 'root' },
  withState({ ...initialState }),
  withEntities({ entity: type<Player>(), collection: 'player' }),
  withEntities({ entity: type<Team>(), collection: 'team' }),
  withComputed(({ playerEntities, userTeamPlayersIds }) => ({
    userTeamPlayer: computed(() => {
      console.log(userTeamPlayersIds());
      console.log(playerEntities());
      return userTeamPlayersIds().map((id) =>
        playerEntities().find((player) => {
          console.log(player);
          return player.id === id;
        })
      );
    }),
  })),
  withComputed(({ formation, userTeamId, userTeamPlayer }) => ({
    playersWithPosition: computed(() => {
      console.log(formation(), userTeamId());
      const teamPlayers = userTeamPlayer().filter((player) => {
        {
          console.log(player);
          return player?.teamId === userTeamId();
        }
      });
      if (teamPlayers.length === 0) return [];
      if (formation() === Formation.Hex) {
        return teamPlayers.map((el) => ({ ...el, position: Position.Flex }));
      } else if (formation() === Formation.HorizontalStack) {
        return teamPlayers.map((el, index) => ({
          ...el,
          position:
            index < MAX_HANDLERS_HORIZONTAL_STACK
              ? Position.Handler
              : Position.Cutter,
        }));
      } else if (formation() === Formation.VerticalStack) {
        return teamPlayers.map((el, index) => ({
          ...el,
          position:
            index < MAX_HANDLERS_VERTICAL_STACK
              ? Position.Handler
              : Position.Cutter,
        }));
      }
      return teamPlayers;
    }),
  })),
  withComputed(({ userTeamId, playerEntities }) => ({
    playerWithAvailability: computed(() =>
      playerEntities().map((player) =>
        addPlayerAvailability(player, userTeamId())
      )
    ),
  })),
  withMethods((store) => ({
    changeFormation: (formation: Formation) =>
      patchState(store, (state) => ({ ...state, formation })),
    swapPlayers: (player1Id: number, player2Id: number) => {
      console.log(player1Id, player2Id);
      const players = [...store.userTeamPlayersIds()];

      const index1 = players.indexOf(player1Id);
      const index2 = players.indexOf(player2Id);
      console.log(index1, index2);
      console.log(players);

      [players[index1], players[index2]] = [players[index2], players[index1]];
      console.log(players);
      return patchState(store, (state) => ({
        ...state,
        userTeamPlayersIds: players,
      }));
    },
  }))
);
