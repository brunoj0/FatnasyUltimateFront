import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { GenericGridComponentComponent } from '../generic-grid-component/generic-grid-component.component';
import { PLAYERS } from 'src/mocks/players';
import { MatDialog } from '@angular/material/dialog';
import { MovePlayerDialogComponent } from '../move-player-dialog/move-player-dialog.component';
import { Player } from '../models/player.model';
import { Subject, map, switchMap, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamStore } from '../team.store';

@Component({
  selector: 'app-team-grid',
  templateUrl: './team-grid.component.html',
  styleUrls: ['./team-grid.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, GenericGridComponentComponent],
})
export class TeamGridComponent {
  readonly store = inject(TeamStore);
  readonly test = true;
  players = this.store.playersWithPosition();

  @Input()
  set formation(value: string) {
    this._formation.set(value)
  }
  constructor(public dialog: MatDialog) {

    effect(() => {
      console.log(`The count is: ${this.store.formation()})`);
      console.log(`The players is: ${this.store.players()})`);
    });
  }
  ngOnInit(): void {
  }

  _formation: WritableSignal<string> = signal('');

  displayedColumns: string[] = ['position', 'name', 'points', 'assists'];

  movePlayer(player: Player) {
    const dialogRef = this.dialog.open(MovePlayerDialogComponent, {
      data:
      {
        players: this.players.filter(el => el.id !== player.id),
        playerToMove: player
      }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (result) {
        this.store.swapPlayers(player, result);
      }
    });
  }

  rowClicked(player: Player) {
    console.log(player)
  }
}
