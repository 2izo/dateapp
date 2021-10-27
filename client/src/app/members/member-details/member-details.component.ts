import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member;
  constructor(
    private memberService: MemberService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    this.memberService
      .getUser(this.activeRouter.snapshot.paramMap.get('username') || '')
      .subscribe((mem) => (this.member = mem));
    console.log(this.member);
  }
}
