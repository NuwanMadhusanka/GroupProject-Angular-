import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { LessonAssingStudentMap } from '../../ClassModel/MapObject/LessonAssignStudentMap';

@Component({
  selector: 'app-lesson-assign-student',
  templateUrl: './lesson-assign-student.component.html',
  styleUrls: ['./lesson-assign-student.component.scss']
})
export class LessonAssignStudentComponent implements OnInit {

  userId;
  lessonId;
  assingStudentList:LessonAssingStudentMap[]=[];
  lessonDate;
  lessonDay;
  lessonTimeSlot;
  message;
  isAnyStudent=false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private instructorService:InstructorServiceService
  ) { }

  ngOnInit() {
    this.lessonId=this.route.snapshot.params['lessonId'];
    this.lessonDay=this.route.snapshot.params['day'];
    this.lessonTimeSlot=this.route.snapshot.params['timeSlot'];
    this.userId=sessionStorage.getItem('userId');

    if(this.lessonId==null || this.userId==null || this.lessonDay==null || this.lessonTimeSlot==null){
      this.router.navigate(['/']);
    }

    this.getAssingStudent();
  }

  //get assing student for specific lesson
  getAssingStudent(){
    this.isAnyStudent=false;
    this.instructorService.getAssignStudent(this.userId,this.lessonId).subscribe(
      response => {
        this.assingStudentList=response;
        if(this.assingStudentList.length == 0){
          this.message="There is no any student yet.";
        }else{
          this.isAnyStudent=true;
          this.setLessonDate();
        }
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  setLessonDate(){
    this.instructorService.getLessonDate(this.userId,this.lessonId).subscribe(
      response => {
        this.lessonDate=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  //Mark the student's practrical ,Whether lesson complete or not
  // mark 1-->complete 2-->notcomplete
  markStudentLesson(studentLessonId,mark){
   this.instructorService.markStudentLesson(studentLessonId,mark).subscribe(
     response => {
      this.getAssingStudent();
     },
     error => {
       console.log(error);
       this.handleErrorResponse(error);
     }
   );
  }

  closeMsg(){
    this.message="";
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
