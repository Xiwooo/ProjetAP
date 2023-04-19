import { Component } from '@angular/core';
import { Task } from './carte-fidelite/carte-fidelite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProjetAP';
  todo: Task[] = [
    {
      nom: 'Le Gal',
      prenom: 'Gwendal',
      point : 43,
      dernierPassage : '14/12/2022'

    },
    {
      nom: 'Rousseau',
      prenom: 'Erwan',
      point : 235,
      dernierPassage : '10/04/2023'
    }
  ];
}
