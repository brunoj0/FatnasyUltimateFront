import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GenericGridComponentComponent } from '../../shared/generic-grid-component/generic-grid-component.component';
import { Player } from '../../core/models/player.model';
import { Formation } from '../../core/models/formation.enum';
import { MyTeamPlayer } from '../../my-team/my-team-player.model';
import { playerFullNameToShortVersion } from '../../shared/utls';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrl: './add-player-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    GenericGridComponentComponent,
    CommonModule,
    MatButtonModule,
  ],
})
export class AddPlayerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      availablePositions: Formation[];
      existingPlayers: MyTeamPlayer[];
      player: Player;
    },
    public dialogRef: MatDialogRef<AddPlayerDialogComponent>
  ) {}

  displayedColumns: string[] = ['position', 'name', 'points', 'assists'];
  displayedPositionColumns: string[] = ['position'];

  get playerName(): string {
    return `${this.data.player.firstName} ${this.data.player.lastName}`;
  }

  addPlayerToPosition(position: any) {
    const playerWithPosition: MyTeamPlayer = {
      ...this.data.player,
      name: this.playerName,
    };
    this.dialogRef.close({
      type: 'add',
      player: playerWithPosition,
      position,
    });
  }

  swapWithPlayer(existingPlayer: Player) {
    const newPlayer: MyTeamPlayer = {
      ...this.data.player,
      name: this.playerName,
    };
    this.dialogRef.close({
      type: 'swap',
      newPlayer,
      existingPlayer,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
