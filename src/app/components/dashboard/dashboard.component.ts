import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

import { Product } from '../create-product/product';
import { ProductDialogComponent , ProductDialogResult } from '../product-dialog/product-dialog.component';
import { Task } from '../../carte-fidelite/carte-fidelite';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogResult, TaskDialogComponent } from '../../task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UrlSerializer } from '@angular/router';
import { User} from '../../shared/services/user'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private dialog: MatDialog, private store: AngularFirestore,public authService: AuthService, private afs: AngularFirestore) {}
  ngOnInit(): void {}
  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  product = this.store.collection('product').valueChanges({idField: 'uid'}) as Observable<Product[]>;
  showForm = false;

  showCreateForm() {
    this.showForm = true;
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.task);
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }
  drop(event: CdkDragDrop<Task[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  displayName: string | undefined;
  email : string | undefined;
  onSubmit(){
    const userRef = this.afs.collection('users').doc(this.authService.userData.uid);
    userRef.update({displayName : this.displayName,
    email : this.email});
  }


  isChef():boolean{
    if(this.authService.userData.uid == "a8aAs0GdqaS2Rx1WXnCXtNaTY863"){
      return true
    }else{
      return false
    }
  }

  dropProduct(event: CdkDragDrop<Product[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.uid).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }


  newProduct(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '270px',
      data: {
        product: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ProductDialogResult) => {
        if (!result) {
          return;
        }
        this.store.collection('product').add(result.product);
      });
  }

  editProduct(list: 'product', product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '270px',
      data: {
        product,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: ProductDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(product.uid).delete();
      } else {
        this.store.collection(list).doc(product.uid).update(product);
      }
    });
  }
}
