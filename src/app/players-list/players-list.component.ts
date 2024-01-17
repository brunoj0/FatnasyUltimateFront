import { Component } from '@angular/core';
import { PLAYERS } from 'src/mocks/players';
import { GenericGridComponentComponent } from '../shared/generic-grid-component/generic-grid-component.component';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../core/models/player.model';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';

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

  players = this.playerSearch.valueChanges.pipe(
    map((searchTerm: string) => {
      console.log(searchTerm);
      if (searchTerm === '') {
        return PLAYERS;
      }
      return PLAYERS.filter((player: Player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }),
    startWith(PLAYERS),
  );
}
