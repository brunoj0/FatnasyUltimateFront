import { Position } from './formation.enum';

export interface PlayerStats {
  playerId: number;
  points: number;
  assists: number;
  position?: Position;
  lastUpdated: Date;
}

export interface PlayerStatsUpdate {
  type: 'UPDATE' | 'RESET';
  stats: PlayerStats[];
}
