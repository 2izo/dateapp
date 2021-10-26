import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  url = 'https://localhost:5001/api/buggy';
  constructor(private http: HttpClient) {}
  validationErrors = [];
  ngOnInit(): void {}
  getNullref() {
    this.http.get(this.url + '/server-error').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getNotFound() {
    this.http.get(this.url + '/not-found').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAuth() {
    this.http.get(this.url + '/auth').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getBadRequest() {
    this.http.get(this.url + '/bad-request').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getValidation() {
    this.http.post('https://localhost:5001/api/account/register', {}).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.validationErrors = err;
        console.log(err);
      }
    );
  }
}
