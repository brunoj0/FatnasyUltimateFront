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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Player } from '../../core/models/player.model';
import { Position } from '../../core/models/formation.enum';
import { FantasyPointsService } from '../../core/services/fantasy-points.service';

interface RowWithAvailability {
  availability?: 'SAME_TEAM' | 'TRANSFER' | 'AVAILABLE';
}

@Component({
  selector: 'app-generic-grid-component',
  imports: [MatTableModule, MatIconModule, CommonModule, MatTooltipModule],
  templateUrl: './generic-grid-component.component.html',
  styleUrl: './generic-grid-component.component.scss',
  standalone: true,
})
export class GenericGridComponentComponent {
  @Input() dataSource: any[] = [];
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

  constructor(private fantasyPointsService: FantasyPointsService) {}

  getFantasyPointsTooltip(position?: Position): string {
    if (!position) return 'Fantasy Points';

    const pointsMultiplier =
      this.fantasyPointsService.getPointsMultiplier(position);
    const assistsMultiplier =
      this.fantasyPointsService.getAssistsMultiplier(position);

    return `Fantasy Points = (Goals × ${pointsMultiplier}) + (Assists × ${assistsMultiplier})
Position: ${position}
- Goals multiplier: ${pointsMultiplier}x
- Assists multiplier: ${assistsMultiplier}x`;
  }

  isRowClickable(row: RowWithAvailability): boolean {
    return row.availability !== this.availability.SAME_TEAM;
  }

  onRowClick(row: RowWithAvailability): void {
    if (this.isRowClickable(row)) {
      this.rowClicked.emit(row);
    }
  }
}
