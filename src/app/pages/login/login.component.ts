import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ToltesService } from '../../shared/services/toltes.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  toltesFeliratkozas?: Subscription;
  toltesObservation?: Observable<boolean>;
  adatokObservation?: Observable<string>;

  constructor(private router: Router, private toltesService : ToltesService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  async login() {
      
    this.authService.login(this.email.value,this.password.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
    }).catch(error => {
      console.error(error);
    });
    
  }


  ngOnDestroy(): void {
    this.toltesFeliratkozas?.unsubscribe();
  }

}
