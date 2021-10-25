import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './_models/User';
import { AccountServiceService } from './_services/account-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Date App';
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountServiceService
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser() {
    if (!!localStorage.getItem('user')) {
      const currentUser: User = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
      this.accountService.setCurrentUser(currentUser);
      return;
    }
  }
}
