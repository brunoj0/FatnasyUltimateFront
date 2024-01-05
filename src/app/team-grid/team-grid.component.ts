import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: string;
  points: number;
  assists: number;
  profileImage: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Hd', name: 'J.Patrzykąt', points: 1, assists: 3, profileImage: '../../assets/profileImages/patrzykat.jpg'},
  {position: 'Ct', name: 'B.Jamuła', points: 4, assists: 3, profileImage: '../../assets/profileImages/jamula.jpg'},
  {position: 'Ct', name: 'Ł.Szewczyk', points: 6, assists: 3,  profileImage: '../../assets/profileImages/szewczyk.jpg'},
  {position: 'Hd', name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {position: 'Ct', name: 'Z.Peplińska', points: 10, assists: 3,  profileImage: '../../assets/profileImages/peplinska.jpg'},
  {position: 'Ct', name: 'J.Pepliński', points: 12, assists: 3,  profileImage: '../../assets/profileImages/peplinski.jpg'},
  {position: 'Hd', name: 'S.Muszyńska', points: 14, assists: 3,  profileImage: '../../assets/profileImages/muszynska.jpg'},
  {position: 'Ct', name: 'A.Krawczyk', points: 15, assists: 3,  profileImage: '../../assets/profileImages/krawczyk.jpg'},
  {position: 'Ct', name: 'L.Gietki', points: 99, assists: 0,  profileImage: '../../assets/profileImages/gietki.jpg'},
  {position: 'Ct', name: 'D.Damian', points: 99, assists: 0,  profileImage: '../../assets/profileImages/damian.jpg'},
  {position: 'Ct', name: 'A.Krawczyk', points: 15, assists: 3,  profileImage: '../../assets/profileImages/krawczyk.jpg'},
  {position: 'Ct', name: 'A.Krawczyk', points: 15, assists: 3,  profileImage: '../../assets/profileImages/krawczyk.jpg'},
  {position: 'Hd', name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {position: 'Hd', name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {position: 'Hd', name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {position: 'Hd', name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
];
@Component({
  selector: 'app-team-grid',
  templateUrl: './team-grid.component.html',
  styleUrls: ['./team-grid.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
})
export class TeamGridComponent {
  readonly test = true;
  @Input()
    set formation(value: string) {
      console.log('ss')
      this.count.set(value)
  }
  count: WritableSignal<string> = signal('');

  displayedColumns: string[] = ['position', 'name', 'points', 'assists'];
  dataSource = computed(() => {
    if(this.count() === 'Hex') {
      return ELEMENT_DATA.map(el => ({...el, position:'Hd'}))
    }else if(this.count() === 'Horizontal Stack'){
      return ELEMENT_DATA.map((el, index) =>
      ({...el, position: index < 6 ? 'Hd' : 'Ct' }))
    }else if(this.count() === 'Vert Stack'){
      return ELEMENT_DATA.map((el, index) =>
      ({...el, position: index < 4 ? 'Hd' : 'Ct' }))
    }
    return ELEMENT_DATA
  });
}
