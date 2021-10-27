import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  currentUser = new ReplaySubject<User>(1);
  currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient) {}
  login(model: User) {
    return this.http
      .post<User>(environment.basicUrl + '/account/login', model)
      .pipe(
        map((res: User) => {
          if (res) {
            localStorage.setItem('user', JSON.stringify(res));
            this.currentUser.next(res);
          }
        })
      );
  }
  register(model: User) {
    return this.http
      .post(environment.basicUrl + '/account/register', model)
      .pipe(
        map((user: any) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.next(user);
          }
        })
      );
  }
  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(undefined);
  }
}
