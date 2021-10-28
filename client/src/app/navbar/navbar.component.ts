import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountServiceService } from '../_services/account-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  loggedIn = false;
  constructor(
    public accountservice: AccountServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountservice.currentUser$.subscribe((user) => {
      this.loggedIn = Boolean(user);
    });
  }
  submit() {
    this.accountservice.login(this.model).subscribe(
      (response) => {
        this.loggedIn = true;
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }
  logout() {
    this.accountservice.logout();
    this.loggedIn = false;
  }
}
