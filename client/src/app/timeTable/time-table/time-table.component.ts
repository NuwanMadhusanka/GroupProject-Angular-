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
    this.timeTableService.getTimeTableList().subscribe(
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

  addLesson(){
    this.router.navigate(['lesson-add']);
  }

  closeMsg(type){
    (type==1 ? this.errorMsg="" : this.successMsg="");
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.httpError.ErrorResponse(error);
  };

}
