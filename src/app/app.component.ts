import { Component, OnInit, effect, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from './core/models/formation.enum';
import { PlayerStore } from './core/player.store';
import { LeagueStore } from './core/league.store';
import { patchState} from '@ngrx/signals';
import { PLAYERS } from 'src/mocks/players';
import { addEntities } from '@ngrx/signals/entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LeagueStore]
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    effect(() => console.log(this.store.playersWithPosition()));
    // effect(() => console.log(this.teamStore.entities()));
  }

  ngOnInit(): void {
    patchState(
      this.store,
      addEntities(PLAYERS,
      { collection: 'player' }
      )
    );
  }
  readonly formations = [
    Formation.VerticalStack,
    Formation.HorizontalStack,
    Formation.Hex
  ]
  readonly store = inject(LeagueStore);

  formation = new FormControl(this.store.formation(), Validators.required);

  title = 'fantasy-ultimate-front';

  changeFormation() {
    this.store.changeFormation(this.formation.value as Formation);
  }
}
