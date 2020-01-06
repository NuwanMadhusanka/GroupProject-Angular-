import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';
import { LeaveSettingModel } from '../../ClassModel/LeaveSettingModel';

@Component({
  selector: 'app-staff-leave',
  templateUrl: './staff-leave.component.html',
  styleUrls: ['./staff-leave.component.scss']
})
export class StaffLeaveComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  currentMonth:Number;
  currentYear:Number;
  lastUpdate = new Date();

  staffLeaveData : LeaveSettingModel ;
  staffLeaves:number;
  updateLeaves:number;
  isUpdate:Boolean=false;
  errorUpdateLeave:String;

  constructor(
    private staffService : StaffServiceService
  ) { }

  ngOnInit() {
    this.getCurrentMonthAndYear();
    this.getStaffLeave();
  }

  getStaffLeave(){
    this.staffService.getStaffLeave().subscribe(
      response => {
        this.staffLeaveData=response;
        this.staffLeaves=+this.staffLeaveData.numLeave;
        this.lastUpdate=this.staffLeaveData.updateDate;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  staffLeaveUpdate(){
    this.isUpdate=true;
  }

  update(){
    this.errorUpdateLeave="";
    if(this.updateLeaves>0 && this.updateLeaves<101){
      this.staffService.updateStaffLeave(new LeaveSettingModel(-1,new Date(),+this.currentMonth+1,this.updateLeaves,this.staffLeaveData.adminId)).subscribe(
        response => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Update Successfulled.',
            showConfirmButton: false,
            timer: 2000
          });
          this.isUpdate=false;
          this.getStaffLeave();
        },
        error => {
          console.log(error);
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Update not successfulled.',
            showConfirmButton: false,
            timer: 3000
          });
          this.handleErrorResponse(error);
        }
      )
    }else{
      this.errorUpdateLeave="Please insert valid leaves(Between 0 and 100)";
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
