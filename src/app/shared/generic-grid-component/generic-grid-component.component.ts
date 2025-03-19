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

interface RowWithAvailability {
  availability?: 'SAME_TEAM' | 'TRANSFER' | 'AVAILABLE';
}

@Component({
  selector: 'app-generic-grid-component',
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './generic-grid-component.component.html',
  styleUrl: './generic-grid-component.component.scss',
  standalone: true,
})
export class GenericGridComponentComponent {
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];

  @Output() positionClicked = new EventEmitter<any>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() availabilityClicked = new EventEmitter<any>();

  availability = {
    AVAILABLE: 'AVAILABLE',
    TRANSFER: 'TRANSFER',
    SAME_TEAM: 'SAME_TEAM',
  } as const;

  _players: WritableSignal<Player[]> = signal([]);

  isRowClickable(row: RowWithAvailability): boolean {
    return row.availability !== this.availability.SAME_TEAM;
  }

  onRowClick(row: RowWithAvailability): void {
    if (this.isRowClickable(row)) {
      this.rowClicked.emit(row);
    }
  }
}
