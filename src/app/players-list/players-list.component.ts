import { Component, inject } from '@angular/core';
import { PLAYERS } from 'src/mocks/players';
import { GenericGridComponentComponent } from '../shared/generic-grid-component/generic-grid-component.component';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../core/models/player.model';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { LeagueStore } from '../core/league.store';
import { addPlayerAvailability, playerFullNameToShortVersion } from '../shared/utls';
import { CommonModule } from '@angular/common';
import { shareReplay, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MyTeamPlayer } from '../my-team/my-team-player.model';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [GenericGridComponentComponent, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent {
  readonly displayedColumns = ['availability','name', 'assists', 'points'];

  playerSearch = new FormControl('', {nonNullable: true});
  readonly store = inject(LeagueStore);

  players = toObservable(this.store.playerWithAvailability).pipe(
    switchMap(players => this.playerSearch.valueChanges.pipe(
      map((searchTerm: string) => {
        if (searchTerm === '') {
          return players;
        }
        return players.filter((player: any) => playerFullNameToShortVersion(player).name.toLowerCase().includes(searchTerm.toLowerCase()));
      }),
      startWith(players),
      map((players: Player[]) => players.map(playerFullNameToShortVersion)),
      tap(data => console.log(data)),
      // shareReplay(1)
    )
  )
  );
}
