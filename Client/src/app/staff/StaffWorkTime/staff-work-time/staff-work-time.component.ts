import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../../Shared/httpError/HttpError';
import { WorkTimeModel } from '../../../ClassModel/WorkTimeModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-work-time',
  templateUrl: './staff-work-time.component.html',
  styleUrls: ['./staff-work-time.component.scss']
})
export class StaffWorkTimeComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

  currentYear:Number;
  currentMonth:Number;
  lastUpdate = new Date();

  workTimeData:WorkTimeModel=new WorkTimeModel(0,new Date(),0,1,1,null);

  isUpdate=false;
  updateWorkTypeId:Number;
  updateWorkType:String;
  updateWorkTime:Number;
  errorUpdateWorkTime:String;

  constructor(
    private staffService :StaffServiceService
  ) { }

  ngOnInit() {
    this.getWorkTime();
    this.getCurrentMonthAndYear();
  }

  getWorkTime(){
    this.staffService.getStaffWorkTime().subscribe(
      response => {
        this.workTimeData=response;
        this.lastUpdate=this.workTimeData.updateDate;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  /*
  workType --> 1->FullDay
           2->HalfDay
  */
  staffWorkTimeUpdate(workType:Number){
    this.isUpdate=true;
    this.updateWorkTypeId=workType;
    if(workType==1){
      this.updateWorkType="Full Day";
      this.updateWorkTime=this.workTimeData.fullDay;
    }else{//workType=2
      this.updateWorkType="Half Day"
      this.updateWorkTime=this.workTimeData.halfDay;
    }
  }

  update(){
    this.errorUpdateWorkTime="";
    if(this.updateWorkTime==null || this.updateWorkTime<=0 || this.updateWorkTime>24){
      this.errorUpdateWorkTime="Enter Valid Work Time";
    }else{
      console.log(this.currentMonth)
      let updateWorkTimeData = new WorkTimeModel(this.workTimeData.workTimeId,new Date(),+this.currentMonth+1,this.workTimeData.fullDay,this.workTimeData.halfDay,this.workTimeData.adminId);
      (this.updateWorkTypeId==1 ? updateWorkTimeData.fullDay=this.updateWorkTime : updateWorkTimeData.halfDay=this.updateWorkTime);
      this.staffService.updateStaffWorkTime(updateWorkTimeData).subscribe(
        response => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Update Successfulled.',
            showConfirmButton: false,
            timer: 2000
          });
          this.isUpdate=false;
          this.getWorkTime();
        },
        error => {
          console.log(error);
          this.handleErrorResponse(error);
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Update not successfulled.',
            showConfirmButton: false,
            timer: 3000
          });
        }
      );
    }
  }

  getCurrentMonthAndYear(){
    var date = new Date(); 
    this.currentMonth=date.getMonth();   
    this.currentYear=date.getFullYear();

    if(this.currentMonth==11){//Month is december
      this.currentMonth=0;
      this.currentYear=+this.currentYear+1;
    }
  }

  handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
