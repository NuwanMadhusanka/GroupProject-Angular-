import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonBookingService } from '../../service/LessonBooking/lesson-booking.service';
import Swal from 'sweetalert2';
import { TimeSlotModel } from '../../ClassModel/TimeSlotModel';
import { TimeTableServiceService } from '../../service/TimeTable/time-table-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';

@Component({
  selector: 'app-trial-lesson-day-feedback',
  templateUrl: './trial-lesson-day-feedback.component.html',
  styleUrls: ['./trial-lesson-day-feedback.component.scss']
})
export class TrialLessonDayFeedbackComponent implements OnInit {

  days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  packageId:Number;
  titleOfPackage:String;
  userId:Number;
  timeSlotList:TimeSlotModel[]=[];

  day1:Number;
  day2:Number;

  time1:TimeSlotModel;
  time2:TimeSlotModel;

  errorMsg:String;
  replyMessage:String;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private lessonBookingService:LessonBookingService,
    private timeTableService:TimeTableServiceService
  ) { }

  ngOnInit() {
    this.packageId=this.route.snapshot.params['packageId'];
    this.userId=this.route.snapshot.params['userId'];
    this.titleOfPackage=this.route.snapshot.params['packageTitle'];
    let userRole = +sessionStorage.getItem('userRole');

    if(this.packageId==null || this.userId==null || userRole!=5){
        this.router.navigate(['/']);
    }
    this.getTimeSlotList();
  }

  getTimeSlotList(){
    this.timeTableService.getTimeSlotList().subscribe(
      response => {
        this.timeSlotList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  save(){
    if(this.time1!=null && this.time2!=null && this.day1!=null && this.day2!=null){
        if( (this.day1==this.day2 && this.time1==this.time2) ){
          this.errorMsg="Don't insert same inputs for both forms.";
        }else{
          this.lessonBookingService.lessonDayFeedback(this.userId,this.packageId,this.day1,this.time1.timeSlotId,this.day2,this.time2.timeSlotId).subscribe(
            response => {
              this.handleResponse(response);
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Submission Successful.',
                showConfirmButton: false,
                timer: 2000
              });
            },
            error => {
              console.log(error);
              Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Submission Not Successful.',
                showConfirmButton: false,
                timer: 2000
              });
            }
          );
        }
    }else{
      this.errorMsg="Complete all and submit";
    }
  }

  handleResponse(reply:Number[]){
    let i=0;
    let message="";
    reply.forEach(element => {
      
      i++;
      let day="";
      let time="";

      if(i==1){//day1 reply
        day=this.days[+this.day1];
        time=this.time1.startTime+" - "+this.time1.finishTime;
      }else{//day2 reply
        day=this.days[+this.day2];
        time=this.time2.startTime+" - "+this.time2.finishTime;
      }

      if(element==+0){
        message+="There is no any lesson on "+day+" at "+time+" .so we will consider about your request.\n";
      }
      if(element==+2){
        message+="There are lessons on "+day+" at "+time+" but no any available space.so we will consider about your request.\n";
      }
    });
    this.replyMessage=message;
  }

  closeMsg(type:Number){
    if(type==1){
      this.errorMsg="";
    }else{
      this.replyMessage="";
    }
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
