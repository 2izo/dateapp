import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';
import { User } from '../_models/User';

// const Headers = new HttpHeaders({
//   Authorization:
//     'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token,
// });

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Member[]>(environment.basicUrl + '/users');
  }

  getUser(username: string) {
    return this.http.get<Member>(environment.basicUrl + '/users/' + username);
  }
  updateUser(member: Member) {
    return this.http.put(environment.basicUrl + '/users/', member);
  }
}
