import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { List } from '../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  list: List = new List();
  listId: string = '';
  item: any;

  constructor(private firestoreService: AuthService) { }

  onSubmit(): void {
    this.firestoreService.getListById(this.listId).subscribe(list => {
      this.list = list;
    });
  }
}
