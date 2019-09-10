import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageModel } from '../../ClassModel/PackageModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { LesonBookingService } from '../../service/LessonBooking/leson-booking.service';
import { StudentLessonModel } from '../../ClassModel/StudentLessonModel';
import { PathMapComponent } from '../../timeTable/path-map/path-map.component';

@Component({
  selector: 'app-trial-lesson-list',
  templateUrl: './trial-lesson-list.component.html',
  styleUrls: ['./trial-lesson-list.component.scss'],
  providers:[PathMapComponent]
})
export class TrialLessonListComponent implements OnInit {

  userId;
  studentPackages:PackageModel[];
  selectPackageTitle;
  errorMessage;

  selectPackageBookLesson:StudentLessonModel[]=[];
  previousLesson:StudentLessonModel[]=[];
  futureLesson:StudentLessonModel[]=[];

  totalLesson;
  reservedLesson;
  remainLesson;
  transmission;

  isBookLeeson=false;

  constructor(
    private lessonBookService:LesonBookingService,
    private pathMap:PathMapComponent,
    private router:Router
  ) { }

  ngOnInit() {
    this.userId=sessionStorage.getItem('userId');
    if(this.userId == null){
        this.router.navigate(['/']);
    }

    this.studentPackageList();
  }

   //get Student following packages Id
  studentPackageList(){
    this.lessonBookService.getStudentPackages(this.userId).subscribe(
      response => {
          this.studentPackages=response;
          if(this.studentPackages.length < 1){
            this.errorMessage="Student Not Following Any Packages";
          }       
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  bookLessonDetails(selectPackageId,title){
    this.previousLesson=[];
    this.futureLesson=[];

    this.selectPackageTitle=title;
    this.errorMessage="";
    this.lessonBookService.getBookLessonDetails(this.userId,selectPackageId).subscribe(
      response => {
        this.selectPackageBookLesson=response;
        if(this.selectPackageBookLesson.length == 0){
          this.errorMessage="You Are Not Booked(Reserved) Any Lessons Yet.";
        }else{
          this.divideLesson(this.selectPackageBookLesson);
        }
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  //select what are the lesson will held in future and past
  divideLesson(bookLesson:StudentLessonModel[]){

    this.isBookLeeson=true;
    let transmission=bookLesson[0].lessonId.transmission;
    if(transmission==1){
      this.transmission="Manual";
      this.totalLesson = bookLesson[0].lessonId.packageId.autoLes;
    }else{
      this.transmission="Auto";
      this.totalLesson = bookLesson[1].lessonId.packageId.manualLes;
    }
    this.reservedLesson=bookLesson.length;
    this.remainLesson=this.totalLesson-this.reservedLesson;

    let currentDate=new Date();
    let currentYear=currentDate.getFullYear();
    let currentMonth=currentDate.getMonth()+1;
    let currentDay=currentDate.getDate();

    
    let currentTimeHour=new Date().getHours();
    let currentTImeMinute=new Date().getMinutes();
    

    bookLesson.forEach(element => {
      
      let date=new Date(element.date);
      let year = date.getFullYear();
      let month=date.getMonth()+1;
      let day=date.getDate();

      let startTime=element.lessonId.timeSlotId.startTime;
      let hour=+(startTime[0]+startTime[1]);
      let minute=+(startTime[3]+startTime[4]);


      if(currentYear == year){
        if(currentMonth == month){
          if(currentDay == day ){

              if(currentTimeHour == hour){
                if(currentTImeMinute > minute){
                  this.previousLesson.push(element);
                }else{
                  this.futureLesson.push(element);
                }
              }else if(currentTimeHour > hour){
                this.previousLesson.push(element);
              }else{
                this.futureLesson.push(element);
              }

          }else if(currentDay > day){
            this.previousLesson.push(element);
          }else{
            this.futureLesson.push(element);
          }
        }else if(currentMonth > month){
          this.previousLesson.push(element);
        }else{
          this.futureLesson.push(element);
        }
      }else if(currentYear > year){
        this.previousLesson.push(element);
      }else{
        this.futureLesson.push(element);
      }
    });

  }

  closeMsg(){
    this.errorMessage="";
  }

  googleMap(path){
    this.pathMap.googleMap(path,1);
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
    }

}
