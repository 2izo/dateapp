import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css'],
})
export class MemberListsComponent implements OnInit {
  members: Member[];
  constructor(private memberservice: MemberService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.memberservice.getUsers().subscribe((e) => (this.members = e));
  }
}
