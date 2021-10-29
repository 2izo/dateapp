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
            console.log(res);

            this.setCurrentUser(res);
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
            this.setCurrentUser(user);
          }
        })
      );
  }
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(undefined);
  }
}
