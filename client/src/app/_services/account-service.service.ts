import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/User';
@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  url = 'https://localhost:5001';
  currentUser = new ReplaySubject<User>(1);
  currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient) {}
  login(model: User) {
    return this.http
      .post<User>('https://localhost:5001/api/account/login', model)
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
      .post('https://localhost:5001/api/account/register', model)
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
