import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AccountServiceService } from '../_services/account-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() canceling = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountServiceService,
    private toastr: ToastrService
  ) {}
  register() {
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }
  cancel() {
    this.canceling.emit(false);
  }
  ngOnInit(): void {}
}
