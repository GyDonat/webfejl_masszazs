import { Component, createPlatform, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppointmentsService } from '../../shared/services/appointments.service';
import { Appointment } from '../../shared/models/Appointment';
import { User } from '../../shared/models/User';
import {DateFormatPipe} from '../../shared/pipes/date-format.pipe'
import { AuthService } from '../../shared/services/auth.service';
import { FoglalasService } from '../../shared/services/foglalas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  //@Input() aktualUserInput: User;
  aktualUser?: firebase.default.User | null;
  aktualUserEmail = {email : ""};
  nincsFoglalas = false;

  /*emailBekeres = new FormGroup({
    email: new FormControl(''),
});*/

  /*foglalas1: Appointment = {
    idopont: "valamikor",
  }
  foglalas2: Appointment = {
    idopont: "máskor"
  }*/
  appointments: Array<Appointment> = [];


  /*appointmentsTabla = this.createForm({
    username: '',
    date: new Date,
    time: ''
  });*/

  constructor(private router: Router, private appointmentService: AppointmentsService, private authService: AuthService, private foglalas: FoglalasService) { }

  ngOnInit(): void {

      //this.aktualUser = this.auth.user;
      this.aktualUserEmail = JSON.parse(localStorage.getItem('aktualUserLocal') as string);
      console.log(this.aktualUserEmail);

        this.foglalas.readByUserEmail(this.aktualUserEmail['email']).subscribe(foglalasok => {
        console.log(foglalasok);
        this.appointments = foglalasok;
        if (this.appointments.length == 0)
        {
          this.nincsFoglalas= true;
        }
        });

        /*this.appointmentService.loadAppointments('foglalasok.json').subscribe((data : Array<Appointment>) => {
        console.log(data);
        this.appointments = data;
        })*/
    
  }

  /*createForm(model: Appointment) {
    return this.fb.group(model);
  }*/

  /*addAppointment(foglalas: Appointment) {
    this.appointments.push(foglalas);
  }*/

  torol(foglalas: Appointment) {
    this.foglalas.delete(foglalas).then(data => {
      //console.log("torol utani data: ",data);
    }).catch(error => {
      console.error(error);
    });

  }

  modosit(foglalas: Appointment) {
    this.router.navigateByUrl('/main');
    /*this.foglalas.update(foglalas).then(data => {
      console.log("modosit utani data: ",data);
    }).catch(error => {
      console.error(error);
    });*/
  }

}
