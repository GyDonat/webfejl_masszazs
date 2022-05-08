import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  aktualUser?: firebase.default.User | null;
  //aktualUserEmail: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.aktualUserObservable().subscribe(user => {
      this.aktualUser = user;
      localStorage.setItem('aktualUserLocal', JSON.stringify(this.aktualUser));
      /*if (user != null)
      {
        this.aktualUserEmail = user['user']; 
      }*/
      console.log("bejelentkezett felhasználó: ",this.aktualUser);
    }, error => {
      console.error(error);
      localStorage.setItem('aktualUserLocal', JSON.stringify('null'));
    })

  }
  ngAfterViewInit(): void {
  }

  menuSwitch(page: string) {
    this.currentPage = page;
    this.selectedPage.emit(this.currentPage);
  }

  logout() {
    this.authService.logout().then(() => {
      console.log("Kijelentkezve");
    }).catch(error => {
      console.error(error);
    });
    this.router.navigateByUrl('/login');
     
  }
}
