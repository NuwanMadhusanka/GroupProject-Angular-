import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.scss']
})
export class LessonAddComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  timeSlot(){
    this.router.navigate(['time-slot']);
  }

}
