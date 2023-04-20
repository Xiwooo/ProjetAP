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
  done: Task[] = [];
  inProgress: Task[] = [];
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

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }
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
