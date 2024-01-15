import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Player } from './models/player.model';
import { Formation } from './models/formation.enum';
import { PLAYERS } from 'src/mocks/players';
import { computed } from '@angular/core';

type TeamState = {
  players: Player[];
  formation: Formation
};

const initialState: TeamState = {
  players: PLAYERS,
  formation: Formation.VerticalStack
};

export const TeamStore = signalStore(
  withState(initialState),

  withComputed(({ players, formation }) => ({
    playersWithPosition: computed(() => {
      if (formation() === Formation.Hex) {
        return players().map(el => ({ ...el, position: 'Hd' }))
      } else if (formation() === Formation.HorizontalStack) {
        return players().map((el, index) =>
          ({ ...el, position: index < 6 ? 'Hd' : 'Ct' }))
      } else if (formation() === Formation.VerticalStack) {
        return players().map((el, index) =>
          ({ ...el, position: index < 4 ? 'Hd' : 'Ct' }))
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
      console.log(index1, index2);
      const newPlayers = [...players];
      newPlayers[index1] = player2;
      newPlayers[index2] = player1;
      console.log(newPlayers);
      return patchState(store, (state) => ({...state, players: newPlayers }));
    }
  }))

);
