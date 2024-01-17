import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Player } from './core/models/player.model';
import { Formation, MAX_HANDLERS_HORIZONTAL_STACK, MAX_HANDLERS_VERTICAL_STACK } from './core/models/formation.enum';
import { PLAYERS } from 'src/mocks/players';
import { computed } from '@angular/core';
import  {withEntities} from '@ngrx/signals/entities';
import { Team } from './core/models/team.model';
// type LeagueState = {
//   players: Player[];
// };

// const initialState: TeamState = {
//   players: PLAYERS,
//   withEntities<Todo>(),

// };

export const TeamStore = signalStore(
  withEntities<Player>(),
  withEntities<Team>(),

);
