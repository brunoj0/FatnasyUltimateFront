import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TeamStore } from './my-team/team.store';
import { Formation } from './core/models/formation.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TeamStore]
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  readonly formations = [
    Formation.VerticalStack,
    Formation.HorizontalStack,
    Formation.Hex
  ]
  readonly store = inject(TeamStore);

  formation = new FormControl(this.store.formation(), Validators.required);

  title = 'fantasy-ultimate-front';

  changeFormation() {
    this.store.changeFormation(this.formation.value as Formation);
  }
}
