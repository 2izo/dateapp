import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../_services/account-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  loggedIn = false;
  constructor(private accountservice: AccountServiceService) {}

  ngOnInit(): void {
    this.accountservice.currentUser$.subscribe((user) => {
      this.loggedIn = Boolean(user);
    });
  }
  submit() {
    this.accountservice.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logout() {
    this.accountservice.logout();
    this.loggedIn = false;
  }
}
