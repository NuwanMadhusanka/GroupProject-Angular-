import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-leave',
  templateUrl: './staff-leave.component.html',
  styleUrls: ['./staff-leave.component.scss']
})
export class StaffLeaveComponent implements OnInit {

  staffLeaves:number;
  updateLeaves:number;
  isUpdate:Boolean=false;
  errorUpdateLeave:String;

  constructor(
    private staffService : StaffServiceService
  ) { }

  ngOnInit() {
    this.getStaffLeave();
  }

  getStaffLeave(){
    this.staffService.getStaffLeave().subscribe(
      response => {
        this.staffLeaves=response;
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
      let adminId = +sessionStorage.getItem("userId");
      this.staffService.updateStaffLeave(adminId,this.updateLeaves).subscribe(
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

  handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
