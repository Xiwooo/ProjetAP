import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './carte-fidelite';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './carte-fidelite.component.html',
  //styleUrls: ['./carte-fidelite.component.css']
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
}