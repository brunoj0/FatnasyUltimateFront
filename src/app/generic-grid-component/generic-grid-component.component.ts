import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-generic-grid-component',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './generic-grid-component.component.html',
  styleUrl: './generic-grid-component.component.scss'
})
export class GenericGridComponentComponent {
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];

  @Output() positionClicked = new EventEmitter<Player>();
  @Output() rowClicked = new EventEmitter<Player>();

  _formation: WritableSignal<string> = signal('');
  _players: WritableSignal<Player[]> = signal([]);
}
