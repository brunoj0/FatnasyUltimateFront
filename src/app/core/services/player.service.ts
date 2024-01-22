import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Observable, delay, map, of } from 'rxjs';
import { PLAYERS } from 'src/mocks/players';
import { playerFullNameToShortVersion } from 'src/app/shared/utls';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  loadPlayers(): Observable<Player[]> {
    return of(PLAYERS).pipe(
      map((players: Player[]) => players.map(playerFullNameToShortVersion)),
      delay(1000)
    );
  }
}
