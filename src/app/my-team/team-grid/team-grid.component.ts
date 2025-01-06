import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { GenericGridComponentComponent } from '../../shared/generic-grid-component/generic-grid-component.component';
import { PLAYERS } from 'src/mocks/players';
import { MatDialog } from '@angular/material/dialog';
import { MovePlayerDialogComponent } from '../../shared/move-player-dialog/move-player-dialog.component';
import { Player } from '../../core/models/player.model';
import { take } from 'rxjs';
import {
  Formation,
  MAX_HANDLERS_HORIZONTAL_STACK,
  MAX_HANDLERS_VERTICAL_STACK,
} from '../../core/models/formation.enum';
import { MyTeamPlayer } from '../my-team-player.model';
import { playerFullNameToShortVersion } from 'src/app/shared/utls';
import { LeagueStore } from 'src/app/core/league.store';

@Component({
  selector: 'app-team-grid',
  templateUrl: './team-grid.component.html',
  styleUrls: ['./team-grid.component.scss'],
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    GenericGridComponentComponent,
  ],
})
export class TeamGridComponent {
  readonly store = inject(LeagueStore);
  readonly test = true;
  players: Signal<MyTeamPlayer[]> = computed(() =>
    (this.store.playersWithPosition() as Player[]).map(
      playerFullNameToShortVersion
    )
  );

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  displayedColumns: string[] = [
    'position',
    'name',
    'points',
    'assists',
    'fpts',
  ];

  movePlayer(player: Player) {
    const playerIndex = this.players()
      .map((player) => player.id)
      .indexOf(player.id);
    const dialogRef = this.dialog.open(MovePlayerDialogComponent, {
      maxWidth: '100vw',
      panelClass: 'move-player-dialog',
      data: {
        players: this.players().filter((el) => el.id !== player.id),
        playerToMove: player,
        position: this.getPositionForIndex(playerIndex),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.store.swapPlayers(player.id, result.id);
        }
      });
  }

  rowClicked(player: Player) {
    console.log(player);
  }

  private getPositionForIndex(index: number): string {
    if (this.store.formation() === 'Hex') {
      return 'Handler';
    } else if (this.store.formation() === Formation.HorizontalStack) {
      return index < MAX_HANDLERS_HORIZONTAL_STACK ? 'Handler' : 'Cutter';
    } else if (this.store.formation() === Formation.VerticalStack) {
      return index < MAX_HANDLERS_VERTICAL_STACK ? 'Handler' : 'Cutter';
    }
    return 'Handler';
  }
}
