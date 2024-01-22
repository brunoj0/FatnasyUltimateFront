import { Component, inject } from '@angular/core';
import { PLAYERS } from 'src/mocks/players';
import { GenericGridComponentComponent } from '../shared/generic-grid-component/generic-grid-component.component';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../core/models/player.model';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { UserTeamStore } from '../my-team/team.store';
import { playerFullNameToShortVersion } from '../shared/utls';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [GenericGridComponentComponent, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent {
  readonly displayedColumns = ['availability','name', 'assists', 'points'];

  playerSearch = new FormControl('', {nonNullable: true});
  readonly store = inject(UserTeamStore);
  players = this.playerSearch.valueChanges.pipe(
    map((searchTerm: string) => {
      console.log(searchTerm);
      if (searchTerm === '') {
        return this.store.players();
      }
      return this.store.players().filter((player: Player) => playerFullNameToShortVersion(player).name.toLowerCase().includes(searchTerm.toLowerCase()));
    }),
    startWith(this.store.players()),
  );
}
