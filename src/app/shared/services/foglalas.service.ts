import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FoglalasService {

  KollekcioUser = 'Users';
  KollekcioFoglalasok = 'Appointments';

  constructor(private firestore: AngularFirestore) { }

  create(foglalas: Appointment) {

    return this.firestore.collection<Appointment>(this.KollekcioFoglalasok).doc(foglalas.email).set(foglalas);
  }

  readAll() {
    return this.firestore.collection<Appointment>(this.KollekcioFoglalasok).valueChanges();

  }

  readByUserEmail(email: string) {
    return this.firestore.collection<Appointment>(this.KollekcioFoglalasok, ref => ref.where('email','==',email)).valueChanges();
      //return this.firestore.collection<Appointment>(this.KollekcioFoglalasok).doc(email).valueChanges();
  }

  update(foglalas: Appointment) {
    return this.firestore.collection<Appointment>(this.KollekcioFoglalasok).doc(foglalas.email).set(foglalas);

  }

  delete(foglalas: Appointment) {
    return this.firestore.collection<Appointment>(this.KollekcioFoglalasok).doc(foglalas.email).delete();


  }
}
