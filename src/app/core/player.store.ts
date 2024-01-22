import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { setEntities, updateAllEntities, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Team } from "./models/team.model";
import { TeamService } from "./services/team.service";
import { inject } from "@angular/core";
import { pipe } from "rxjs/internal/util/pipe";
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";
import { PlayerService } from "./services/player.service";
import { Player } from "./models/player.model";

export const PlayerStore = signalStore(
  withState({ isLoading: false }),
  withEntities<Player>(),
  withMethods((store) => {
    const playerService = inject(PlayerService);
    return {
      loadPlayers: rxMethod<void>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return playerService.loadPlayers().pipe(
              tapResponse({
                next: (players) => patchState(store, setEntities( players )),
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),
    }
  }
  ),

);
