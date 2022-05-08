import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collekcio = 'Users';

  constructor(private firestore: AngularFirestore) { }

  create(user: User) {
    return this.firestore.collection<User>(this.collekcio).doc(user.id).set(user);
  }

  read() {
    //return this.firestore.collection<User>(this.collekcio).doc()

  }

  update() {


  }

  delete() {


  }

}
