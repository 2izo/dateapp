import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';

@Component({
  selector: 'app-membercard',
  templateUrl: './membercard.component.html',
  styleUrls: ['./membercard.component.css'],
})
export class MembercardComponent implements OnInit {
  @Input() member: Member;
  constructor() {}

  ngOnInit(): void {}
}
