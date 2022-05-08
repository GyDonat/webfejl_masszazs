import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { min } from 'rxjs';
import { User } from '../../shared/models/User';
import { Appointment } from '../../shared/models/Appointment';
import { AuthService } from '../../shared/services/auth.service';
import { FoglalasService } from '../../shared/services/foglalas.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  aktualUserEmail = {email : ""};
  aktualUser: User = { id: "", email: "", becenev: ""};

  osszesFoglalas: Array<Appointment> = [];

  datum = new Date();
  maxDate = new Date();
  minDate = new Date();
  selectedHour: string = '8:00';
  selectedDate: string =  this.pipe.transform(new Date());
  defaultDate = new Date(this.datum.getFullYear(),this.datum.getMonth()+1,this.datum.getDate()+1);

  sikeres = false;
  foglalt = false;
  hibas1 = false;
  hibas2 = false;

  foglalasVan = false;
  /*naptarErtek = new FormControl('');*/

  constructor(private foglalas: FoglalasService, private authService: AuthService, private pipe: DateFormatPipe) { }

  ngOnInit(): void {
    
    this.kiIrastTorol();
    this.datum = new Date();
    //console.log(this.datum);
    this.minMaxDatumKalkulator();
    this.selectedDate=this.pipe.transform(this.defaultDate);
    //console.log(this.datumAtalakit(this.datum));
    this.aktualUserEmail = JSON.parse(localStorage.getItem('aktualUserLocal') as string);
    console.log("local: ", this.aktualUserEmail['email']);

    this.foglalas.readAll().subscribe(data => {
      this.osszesFoglalas = data;
    });
    /*this.authService.aktualUserObservable().subscribe(user => {
        this.aktualUserEmail = user?.email;
      //this.aktualUser = {id: user?.email, email: "", becenev: ""};
    }, error => {
      console.error(error);
      localStorage.setItem('aktualUserLocal', JSON.stringify('null'));
    })*/

  }

  datumAtalakit(datum: Date): string{
      let joEv = datum.getFullYear().toString();
      let joHonap = "";
      if (datum.getMonth() <9 )
      {
        joHonap = "0" + (datum.getMonth()+1).toString();
      }
      else
      {
        joHonap = (datum.getMonth()+1).toString();
      }
      let joNap = (datum.getDate()).toString();
      let joDatum = joEv+"-"+joHonap+"-"+joNap;
      return joDatum
  }

  minMaxDatumKalkulator() {
    this.minDate = new Date(this.datum.getFullYear(),this.datum.getMonth()+1,this.datum.getDate()+1);
    //console.log(this.minDate);
    this.maxDate.setFullYear(this.minDate.getFullYear()+1);
    //console.log(this.maxDate);
  }

  hourSwitch(hourValue: string) {

    this.selectedHour = hourValue + ":00";
    //this.selectedHour.emit(pageValue);
  }

  foglal() {

    if (this.hibas1)
    {
      this.kiIrastTorol();
      this.hibas2=true;
    }
    else
    {
      this.kiIrastTorol();
      let vegleges: Appointment = {email: this.aktualUserEmail['email'],idopont : this.selectedDate + " " + this.selectedHour };
      //console.log("vegleges: ",vegleges);
      //valamiért csak akkor működik, ha így kiírom változóba
      this.foglalt = this.foglaltE(vegleges.idopont);
      if ( !( this.foglalt)  )
      {
        if (this.foglalasVan)
        {
          this.foglalas.update(vegleges).then(data => {
            this.sikeres=true;
          }).catch(error => {
            console.error(error);
            this.hibas2 = true;
          });
        }
        else
        {
          this.foglalas.create(vegleges).then(data => {
            this.sikeres = true;
          }).catch(error => {
            console.error(error);
            this.hibas2 = true;
          });
        }
        
      }
    }
    
    
  }

  public onDateChange(event: any) {
    console.log(event.value);
    if (event.value != null)
    {
      this.selectedDate=this.pipe.transform(event.value);
      //this.selectedDate = this.datumAtalakit(event.value);
      console.log(this.selectedDate);
    }
    else
    {
      this.hibas1 = true;
    }
    
  }

  foglaltE(valasztott: string): boolean {
    
    let fogl = false;
    //ellenőrzés, volt-e már
    for (let i=0;i<this.osszesFoglalas.length;i++)
      {
        if (this.osszesFoglalas[i].idopont == valasztott)
        {
          fogl = true;
        }
        if (this.osszesFoglalas[i].email == this.aktualUserEmail['email'])
        {
          this.foglalasVan = true;
        }

      }
    return fogl;
  }

  kiIrastTorol() {
    this.sikeres = false;
    this.foglalt = false;
    this.hibas1 = false;
    this.hibas2 = false;
  }

}
