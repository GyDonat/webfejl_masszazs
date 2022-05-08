import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { ToltesService } from '../../shared/services/toltes.service';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  toltesFeliratkozas?: Subscription;
  
  signUpForm = new FormGroup({
      email: new FormControl(''),
      becenev : new FormControl(''),
      password: new FormControl(''),
      passwordAgain: new FormControl('')
  });

  helytelen: boolean = false;
  sikeres: boolean = false;

  constructor(private router: Router, private location: Location, private authService: AuthService, private userService : UserService,  private toltesService : ToltesService) { }

  ngOnInit(): void {
    this.helytelen=false;
    this.sikeres=false;
  }

  async onSubmit() {
    this.helytelen=false;
    this.sikeres=false;
    if (this.signUpForm.get('email')?.value === '' || this.signUpForm.get('password')?.value === '' || this.signUpForm.get('becenev')?.value === '')
    {
      this.helytelen = true;
    }
    else
    {
      this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then((cred) => {
        console.log(cred);
        const user: User = {id: cred.user?.uid as string, email: this.signUpForm.get('email')?.value, becenev: this.signUpForm.get('becenev')?.value};
        this.userService.create(user).then(_ => {
          this.helytelen=false;
          this.sikeres = true;
          this.router.navigateByUrl('/main');
        }).catch(error => {
          this.helytelen = true;
        })
        

      }).catch(error => {
        this.helytelen = true;
        //console.error(error);
      });
    }
    
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.toltesFeliratkozas?.unsubscribe();
  }

}
