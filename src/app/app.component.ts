import { Component, OnInit, effect, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserTeamStore } from './my-team/team.store';
import { Formation } from './core/models/formation.enum';
import { TeamStore } from './core/team.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserTeamStore, TeamStore]
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    effect(() => console.log(this.teamStore.isLoading()));
    effect(() => console.log(this.teamStore.entities()));
  }
  readonly teamStore = inject(TeamStore);

  ngOnInit(): void {
    this.teamStore.loadTeams();
  }
  readonly formations = [
    Formation.VerticalStack,
    Formation.HorizontalStack,
    Formation.Hex
  ]
  readonly store = inject(UserTeamStore);

  formation = new FormControl(this.store.formation(), Validators.required);

  title = 'fantasy-ultimate-front';

  changeFormation() {
    this.store.changeFormation(this.formation.value as Formation);
  }
}
