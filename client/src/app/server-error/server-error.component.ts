import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css'],
})
export class ServerErrorComponent implements OnInit {
  error: any;
  constructor(private root: Router) {
    const nav = root.getCurrentNavigation();
    console.log(nav);

    this.error = nav?.extras?.state?.error;
  }

  ngOnInit(): void {}
}
