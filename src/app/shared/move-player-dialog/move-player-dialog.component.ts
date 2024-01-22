import { Component, EventEmitter, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TeamGridComponent } from "../../my-team/team-grid/team-grid.component";
import { Player } from '../../core/models/player.model';
import { Formation } from 'src/app/core/models/formation.enum';
import { GenericGridComponentComponent } from '../generic-grid-component/generic-grid-component.component';
import { MyTeamPlayer } from 'src/app/my-team/my-team-player.model';

@Component({
    selector: 'app-move-player-dialog',
    standalone: true,
    templateUrl: './move-player-dialog.component.html',
    styleUrl: './move-player-dialog.component.scss',
    imports: [MatDialogModule, MatFormFieldModule, TeamGridComponent, GenericGridComponentComponent]
})
export class MovePlayerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {players: MyTeamPlayer[], playerToMove: MyTeamPlayer, position: Formation}, public dialogRef: MatDialogRef<MovePlayerDialogComponent>) { }

  swapPlayersIndex = new EventEmitter<[number, number]>();

  displayedColumns: string[] = ['position', 'name', 'points', 'assists'];

  movePlayer(event: Player) {
    this.dialogRef.close(event);
  }
}
