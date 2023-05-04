import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  createUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', Validators.required],
    });
  }

  createUser() {
    if (this.createUserForm.valid) {
      const email = this.createUserForm.value.email;
      const password = this.createUserForm.value.password;
      const displayName = this.createUserForm.value.displayName;

      this.auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          return this.firestore.collection('users').doc(user?.uid).set({
            displayName: displayName,
            email: email,
            password: password
          });
        })
        .then(() => {
          console.log('Utilisateur créé avec succès.');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
