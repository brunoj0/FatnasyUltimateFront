import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { GenericGridComponentComponent } from '../shared/generic-grid-component/generic-grid-component.component';
import { PLAYERS } from 'src/mocks/players';
import { MatDialog } from '@angular/material/dialog';
import { MovePlayerDialogComponent } from '../shared/move-player-dialog/move-player-dialog.component';
import { Player } from '../core/models/player.model';
import { Subject, map, switchMap, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamStore } from '../team.store';
import { Formation, MAX_HANDLERS_HORIZONTAL_STACK, MAX_HANDLERS_VERTICAL_STACK } from '../core/models/formation.enum';

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

  constructor(public dialog: MatDialog) {

    effect(() => {
      console.log(`The count is: ${this.store.formation()})`);
      console.log(`The players is: ${this.store.players()})`);
    });
  }
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'points', 'assists'];

  movePlayer(player: Player) {
    const playerIndex = this.players.map(player => player.id).indexOf(player.id);
    const dialogRef = this.dialog.open(MovePlayerDialogComponent, {
      maxWidth: '100vw',
      panelClass: 'move-player-dialog',
      data:
      {
        players: this.players.filter(el => el.id !== player.id),
        playerToMove: player,
        position: this.getPositionForIndex(playerIndex)
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

  private getPositionForIndex(index: number): string {
    if(this.store.formation() === 'Hex') {
      return 'Handler';
    } else if (this.store.formation() === Formation.HorizontalStack) {
      return index < MAX_HANDLERS_HORIZONTAL_STACK ? 'Handler' : 'Cutter';
    } else if (this.store.formation() === Formation.VerticalStack) {
      return index < MAX_HANDLERS_VERTICAL_STACK ? 'Handler' : 'Cutter';
    }
    return 'Handler';
  }
}
