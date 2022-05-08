import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/Appointment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  loadAppointments(metaUrl: string): Observable<Array<Appointment>> {
    //return this.http.get(environment.hostUrl + '/assets/' + metaUrl) as Observable<Array<Appointment>>;
    return this.firestore.collection<Appointment>('Appointments').valueChanges();
  }
}
