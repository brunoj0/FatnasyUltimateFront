import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly formations = [
    'Vert Stack',
    'Horizontal Stack',
    'Hex'
  ]
  title = 'fantasy-ultimate-front';
}
