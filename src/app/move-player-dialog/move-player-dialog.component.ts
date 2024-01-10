import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TeamGridComponent } from "../team-grid/team-grid.component";

@Component({
    selector: 'app-move-player-dialog',
    standalone: true,
    templateUrl: './move-player-dialog.component.html',
    styleUrl: './move-player-dialog.component.css',
    imports: [MatDialogModule, MatFormFieldModule, TeamGridComponent]
})
export class MovePlayerDialogComponent {

}
