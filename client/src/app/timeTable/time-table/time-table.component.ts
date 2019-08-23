import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  addLesson(){
    this.router.navigate(['lesson-add']);
  }

}
