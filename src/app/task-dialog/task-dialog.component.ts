import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../carte-fidelite/carte-fidelite';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  //styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.nom = this.backupTask.nom;
    this.data.task.prenom = this.backupTask.prenom;
    this.data.task.point = this.backupTask.point;
    this.data.task.dernierPassage = this.backupTask.dernierPassage;
    this.dialogRef.close(this.data);
  }
}
export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}