import { Task } from './carte-fidelite/carte-fidelite';
import { Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogResult, TaskDialogComponent } from './task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from './components/create-product/product';
import { ProductDialogComponent, ProductDialogResult } from './components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "ProjetAP"
  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  product = this.store.collection('product').valueChanges({ idField: 'uid' }) as Observable<Product[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

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
