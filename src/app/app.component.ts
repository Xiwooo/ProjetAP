import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from './carte-fidelite/carte-fidelite';
import { TaskDialogResult } from './task-dialog/task-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
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
  constructor(private dialog: MatDialog) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
      });
  }
}
