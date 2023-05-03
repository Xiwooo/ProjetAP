import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User} from '../../shared/services/user'

@Component({
  selector: 'app-give-points',
  templateUrl: './give-point.component.html',
  styleUrls: ['./give-point.component.scss']
})
export class GivePointsComponent {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  selectedUserId: string = '';
  points: number = 0;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges({ idField: 'id' });
  }

  givePoints() {
    if (this.selectedUserId && this.points > 0) {
      const userDoc = this.usersCollection.doc<User>(this.selectedUserId);
      userDoc.update({ points: this.points });
      this.selectedUserId = '';
      this.points = 0;

    }
  }

}
