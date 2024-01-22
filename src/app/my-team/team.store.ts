import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Player } from '../core/models/player.model';
import { Formation, MAX_HANDLERS_HORIZONTAL_STACK, MAX_HANDLERS_VERTICAL_STACK } from '../core/models/formation.enum';
import { PLAYERS } from 'src/mocks/players';
import { computed } from '@angular/core';

type TeamState = {
  players: Player[];
  formation: Formation
  
};

const initialState: TeamState = {
  players: PLAYERS.map(el => ({ ...el, name: `${el.firstName}.${el.lastName}` })),
  formation: Formation.VerticalStack
};

export const UserTeamStore = signalStore(
  withState(initialState),
  withComputed(({ players, formation }) => ({
    playersWithPosition: computed(() => {
      console.log(formation())
      if (formation() === Formation.Hex) {
        return players().map(el => ({ ...el, position: 'Hd' }))
      } else if (formation() === Formation.HorizontalStack) {
        return players().map((el, index) =>
          ({ ...el, position: index < MAX_HANDLERS_HORIZONTAL_STACK ? 'Hd' : 'Ct' }))
      } else if (formation() === Formation.VerticalStack) {
        return players().map((el, index) =>
          ({ ...el, position: index < MAX_HANDLERS_VERTICAL_STACK ? 'Hd' : 'Ct' }))
      }
      return players()
    }),
  })),
  withMethods((store) => ({
    changeFormation: (formation: Formation) => patchState(store, (state) => ({ ...state, formation })) ,
    swapPlayers: (player1: Player, player2: Player) => {
      const players = store.players();
      const index1 = players.map(player => player.id).indexOf(player1.id);
      const index2 = players.map(player => player.id).indexOf(player2.id);
      const newPlayers = [...players];
      newPlayers[index1] = player2;
      newPlayers[index2] = player1;
      return patchState(store, (state) => ({...state, players: newPlayers }));
    }
  }))

);
