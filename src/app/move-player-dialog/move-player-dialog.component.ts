import { Component, EventEmitter, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TeamGridComponent } from "../team-grid/team-grid.component";
import { GenericGridComponentComponent } from '../generic-grid-component/generic-grid-component.component';
import { Player } from '../models/player.model';
import { TeamStore } from '../team.store';

@Component({
    selector: 'app-move-player-dialog',
    standalone: true,
    templateUrl: './move-player-dialog.component.html',
    styleUrl: './move-player-dialog.component.scss',
    imports: [MatDialogModule, MatFormFieldModule, TeamGridComponent, GenericGridComponentComponent]
})
export class MovePlayerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {players: Player[], playerToMove: Player}, public dialogRef: MatDialogRef<MovePlayerDialogComponent>) { }

  swapPlayersIndex = new EventEmitter<[number, number]>();

  displayedColumns: string[] = ['position', 'name', 'points', 'assists'];

  movePlayer(event: Player) {
    console.log(event);
    // this.swapPlayersIndex.emit(event);
    this.dialogRef.close(event);
  }
}
