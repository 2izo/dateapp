import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/User';
import { AccountServiceService } from 'src/app/_services/account-service.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  user: User;
  member: Member;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotfiaction(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private accountService: AccountServiceService,
    private memberService: MemberService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((e) => (this.user = e));
    this.memberService
      .getUser(this.user.username)
      .subscribe((m) => (this.member = m));
  }
  update() {
    this.memberService.updateUser(this.member).subscribe(() => {
      this.toaster.success('Updated successfuly');
      this.editForm.reset(this.member);
    });
  }
}
