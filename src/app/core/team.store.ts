import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { setEntities, updateAllEntities, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Team } from "./models/team.model";
import { TeamService } from "./services/team.service";
import { inject } from "@angular/core";
import { pipe } from "rxjs/internal/util/pipe";
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";

export const TeamStore = signalStore(
  withState({ isLoading: false }),
  withEntities<Team>(),
  withMethods((store) => {
    const teamService = inject(TeamService);
    return {
      loadTeams: rxMethod<void>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return teamService.loadTeams().pipe(
              tapResponse({
                next: (teams) => patchState(store, setEntities( teams )),
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
