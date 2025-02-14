import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Player } from '../../core/models/player.model';
import { PlayerAvailability } from 'src/app/core/models/player-availability.enum';

@Component({
  selector: 'app-generic-grid-component',
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './generic-grid-component.component.html',
  styleUrl: './generic-grid-component.component.scss',
})
export class GenericGridComponentComponent {
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];

  @Output() positionClicked = new EventEmitter<Player>();
  @Output() rowClicked = new EventEmitter<Player>();
  @Output() availabilityClicked = new EventEmitter<Player>();
  availability = PlayerAvailability;
  _players: WritableSignal<Player[]> = signal([]);
}
