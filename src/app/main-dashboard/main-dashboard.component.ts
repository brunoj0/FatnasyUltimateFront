import { Component, effect, inject } from '@angular/core';
import { LeagueStore } from '../core/league.store';
import { MatDialog } from '@angular/material/dialog';
import { patchState } from '@ngrx/signals';
import { addEntities } from '@ngrx/signals/entities';
import { Formation } from '../core/models/formation.enum';
import { PLAYERS } from 'src/mocks/players';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyTeamComponent } from '../my-team/my-team.component';
import { PlayersListComponent } from '../players-list/players-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MyTeamComponent,
    PlayersListComponent,
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss',
  providers: [LeagueStore],
})
export class MainDashboardComponent {
  constructor(
    public dialog: MatDialog,
    private route: Router
  ) {
    effect(() => console.log(this.store.playersWithPosition()));
    // effect(() => console.log(this.teamStore.entities()));
  }
  test() {
    this.route.navigate(['/login'], { skipLocationChange: false });
  }
  ngOnInit(): void {
    patchState(this.store, addEntities(PLAYERS, { collection: 'player' }));
  }
  readonly formations = [
    Formation.VerticalStack,
    Formation.HorizontalStack,
    Formation.Hex,
  ];
  readonly store = inject(LeagueStore);

  formation = new FormControl(this.store.formation(), Validators.required);

  title = 'fantasy-ultimate-front';

  changeFormation() {
    this.store.changeFormation(this.formation.value as Formation);
  }
}
