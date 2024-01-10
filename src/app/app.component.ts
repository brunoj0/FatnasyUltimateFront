import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MovePlayerDialogComponent } from './move-player-dialog/move-player-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dialog.open(MovePlayerDialogComponent, {
      width: '100%',
      maxWidth: '100vw',
      panelClass: 'move-player-dialog'
    });
  }
  readonly formations = [
    'Vert Stack',
    'Horizontal Stack',
    'Hex'
  ]
  formation = new FormControl('Vert Stack', Validators.required);;
  title = 'fantasy-ultimate-front';
}
