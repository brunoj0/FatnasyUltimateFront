import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PlayerStats, PlayerStatsUpdate } from '../models/player-stats.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerStatsWebSocketService {
  private socket$!: WebSocketSubject<PlayerStatsUpdate>;
  private statsSubject = new BehaviorSubject<PlayerStats[]>([]);
  private connectionStatus = new BehaviorSubject<boolean>(false);

  constructor() {
    this.connect();
  }

  private connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({
        url: environment.wsUrl + '/player-stats',
        openObserver: {
          next: () => {
            console.log('WebSocket connected');
            this.connectionStatus.next(true);
          },
        },
        closeObserver: {
          next: () => {
            console.log('WebSocket disconnected');
            this.connectionStatus.next(false);
            // Attempt to reconnect after 5 seconds
            setTimeout(() => this.connect(), 5000);
          },
        },
      });

      this.socket$.subscribe({
        next: (update: PlayerStatsUpdate) => {
          if (update.type === 'RESET') {
            this.statsSubject.next(update.stats);
          } else {
            const currentStats = this.statsSubject.value;
            const updatedStats = currentStats.map((current) => {
              const updatedStat = update.stats.find(
                (stat) => stat.playerId === current.playerId
              );
              return updatedStat || current;
            });
            this.statsSubject.next(updatedStats);
          }
        },
        error: (error: any) => {
          console.error('WebSocket error:', error);
          this.connectionStatus.next(false);
        },
      });
    }
  }

  getStats(): Observable<PlayerStats[]> {
    return this.statsSubject.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
