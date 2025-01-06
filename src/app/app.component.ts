import { Component, OnInit, effect, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from './core/models/formation.enum';
import { PlayerStore } from './core/player.store';
import { LeagueStore } from './core/league.store';
import { patchState } from '@ngrx/signals';
import { PLAYERS } from 'src/mocks/players';
import { addEntities } from '@ngrx/signals/entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LeagueStore],
  standalone: false,
})
export class AppComponent {}
