import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTableDataList } from '../../ClassModel/MapObject/TimeTableDataList';
import { TimeTableServiceService } from '../../service/TimeTable/time-table-service.service';
import { forEach } from '@angular/router/src/utils/collection';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  timeTableList:TimeTableDataList[]=[];
  rowSpanLength=[];

  isDeactiveLesson=false;
  deactivateLessonList:TimeTableDataList[]=[];
  deacivateRowSpanLength=[];

  successMsg="";
  errorMsg="";

  httpError:HttpError

  constructor(
    private router:Router,
    private timeTableService:TimeTableServiceService
  ) { }

  ngOnInit() {
    this.getTimeTableList();
  }

  getTimeTableList(){
    this.rowSpanLength=[];
    this.timeTableService.getTimeTableList(1).subscribe(
      response => {
        this.timeTableList=response;

        this.timeTableList.forEach(element => {
          let lengthRow=0;
          element.numStuData.forEach( x => {
            lengthRow+=x.length;
          });
          this.rowSpanLength.push(lengthRow);
        });

      },
      error =>{
        console.log(error);
      }
    )
  }

  lessonDelete(lessonId){

    Swal.fire({
      title: 'Are you sure?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.timeTableService.deleteLesson(lessonId).subscribe(
          response => {
            if(response == 0){//delete success
              this.successMsg="Delete Successful."
              this.getTimeTableList();
            }else if(response == 1){//foreign key constrains 
              this.errorMsg="Delete Not Successful.(Solution:Instead of delete can change the status of the lesson)";
            }
          },
          error => {
              console.log(error);
              this.errorMsg="Something Happend Bad.Please Try Again Later";
              this.handleErrorResponse(error);
          }
        );
      }
    });
  }

  lessonDeactivate(lessonId){   
    Swal.fire({
      title: 'Are you sure?',
      text: "Lesson Is Deactivated.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Deactivate!'
    }).then((result) => {
      if (result.value) {
        this.timeTableService.lessonDeactivate(lessonId).subscribe(
          response => {
            this.successMsg="Lesson Deactivated Successful.";
            this.getTimeTableList();
            this.getDeactivateLessonList();
          },
          error => {
            this.errorMsg="Lesson Deactivated Not Successful.";
          }
        )
      }
    })
  }

 

  getDeactivateLessonList(){
    this.deacivateRowSpanLength=[];
    this.timeTableService.getTimeTableList(0).subscribe(
      response => {
        this.deactivateLessonList=response;

        this.deactivateLessonList.forEach(element => {
          let lengthRow=0;
          element.numStuData.forEach( x => {
            lengthRow+=x.length;
          });
          this.deacivateRowSpanLength.push(lengthRow);
        });

      },
      error =>{
        console.log(error);
      }
    )
  }

  lessonActivate(lessonId){ 
    this.timeTableService.lessonActivate(lessonId).subscribe(
      response => {
        if(response == 1){
          this.getTimeTableList();
          this.getDeactivateLessonList();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Lesson Activated',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            title: "Can't Activate Lesson.(Lesson's Instructor not available.)",
            text: "Can Activate lesson by update the lesson's instructor",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update Instructor'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['lesson-update',lessonId,0]);
            }
          });
        }
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  activateLesson(){
    this.isDeactiveLesson=true;
    this.getDeactivateLessonList();
  }

  addLesson(){
    this.router.navigate(['lesson-add']);
  }

  lessonUpdate(lessonId){
    this.router.navigate(['lesson-update',lessonId,1]);
  }

  closeMsg(type){
    (type==1 ? this.errorMsg="" : this.successMsg="");
  }

  close(){
    this.isDeactiveLesson=false;
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.httpError.ErrorResponse(error);
  };

}
