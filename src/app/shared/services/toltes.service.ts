import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'  //emiatt bárhová injektálható, hiszen a gyökérben van
})
export class ToltesService {

  constructor(private authService: AuthService) { }

  toltesPromissal(userName: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let toltesIdo=Math.floor(Math.random() * 5) + 1;
      setTimeout(() => {
        if (userName === 'asd' && password === '12345')
        {
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      }, toltesIdo*1000);
    });
  }

  toltesObservable(userName: string, password: string): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i=0;
      const interval = setInterval(() => {
        i++;
        if (i ===3 )
        {
          if (userName === 'asd' && password === '12345')
        {
          subscriber.next(true);
          subscriber.complete();
        }
        else
        {
          subscriber.next(false);
        }
          clearInterval(interval);
        }

      }, 1000);
    });
  }

  helyesAdatokObservable(userName: string, password: string): Observable<string> {
    return new Observable((subscriber: Subscriber<string>) => {
      const interval = setTimeout(() => {
          if (userName === 'asd' && password === '12345')
          {
            subscriber.next("Sikeres bejelentkezés, átirányítás a foglaláshoz...");
            subscriber.complete();
          }
          else
          {
           subscriber.next("Helytelen felhasználónév vagy jelszó");
          }
      }, 1000);
    });

  }
}
