import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  switching = false;

  constructor(private http: HttpClient) {}
  switch() {
    this.switching = !this.switching;
    console.log(this.switching);
  }
  ngOnInit(): void {}

  cancelRegister(event: boolean) {
    this.switching = event;
  }
}
