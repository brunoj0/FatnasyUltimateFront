import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FORMATIONS, Formation } from '../core/models/formation.enum';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeagueStore } from '../core/league.store';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { TeamGridComponent } from './team-grid/team-grid.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-my-team',
  standalone: true,
  imports: [MatIconModule, FormsModule, MatFormFieldModule,
    MatInputModule, MatTabsModule, TeamGridComponent, ReactiveFormsModule, MatSelectModule,
    FormsModule,
  ],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss'
})
export class MyTeamComponent {
  constructor(public dialog: MatDialog) { }

  readonly formations = FORMATIONS;

  readonly store = inject(LeagueStore);

  formation = new FormControl(this.store.formation(), Validators.required);

  title = 'fantasy-ultimate-front';

  changeFormation(value: Formation) {
    this.store.changeFormation(value);
  }
}
