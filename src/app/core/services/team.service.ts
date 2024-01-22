import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  loadTeams(): Observable<Team[]> {
    return of([
      {id: '1', name: 'Team 1'},
      {id: '2', name: 'Team 2'},
      {id: '3', name: 'Team 3'},
      {id: '4', name: 'Team 4'},
      {id: '5', name: 'Team 5'},
      {id: '6', name: 'Team 6'},
      {id: '7', name: 'Team 7'},
      {id: '8', name: 'Team 8'},
      {id: '9', name: 'Team 9'},
      {id: '10', name: 'Team 10'},
      {id: '11', name: 'Team 11'},
      {id: '12', name: 'Team 12'},
      {id: '13', name: 'Team 13'},
      {id: '14', name: 'Team 14'},
      {id: '15', name: 'Team 15'},
      {id: '16', name: 'Team 16'},
      {id: '17', name: 'Team 17'},
      {id: '18', name: 'Team 18'},
      {id: '19', name: 'Team 19'},
      {id: '20', name: 'Team 20'},
      {id: '21', name: 'Team 21'},
      {id: '22', name: 'Team 22'},
      {id: '23', name: 'Team 23'},
      {id: '24', name: 'Team 24'},
      {id: '25', name: 'Team 25'},
      {id: '26', name: 'Team 26'},
      {id: '27', name: 'Team 27'},
      {id: '28', name: 'Team 28'},
      {id: '29', name: 'Team 29'},
      {id: '30', name: 'Team 30'},
      {id: '31', name: 'Team 31'},
      {id: '32', name: 'Team 32'},
      {id: '33', name: 'Team 33'},
      {id: '34', name: 'Team 34'},
      {id: '35', name: 'Team 35'},
      {id: '36', name: 'Team 36'}
    ]).pipe(delay(1000));
  }
}
