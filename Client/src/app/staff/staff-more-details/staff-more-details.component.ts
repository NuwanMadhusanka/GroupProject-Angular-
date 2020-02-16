import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { InstructorModel } from '../../ClassModel/InstructorModel';

@Component({
  selector: 'app-staff-more-details',
  templateUrl: './staff-more-details.component.html',
  styleUrls: ['./staff-more-details.component.scss']
})
export class StaffMoreDetailsComponent implements OnInit {

  userId:number;
  staffType:number;

  staffData :StaffModel;
  adminStaffData :AdminStaffModel;
  instructorData :InstructorModel;

  constructor(
    private route :ActivatedRoute,
    private staffService :StaffServiceService,
    private adminStaffService :AdminStaffServiceService
  ) { }

  ngOnInit() {
    this.userId=this.route.snapshot.params['id']; 
    this.getStaffData();
  }

  getStaffData(){
    this.staffService.getStaffData(this.userId).subscribe(
      response => {
        this.staffData = response;
        if(this.staffData.userId.role == 4){

        }
        if(this.staffData.userId.role==2 || this.staffData.userId.role==3){
          this.adminStaffService.getAdminStaffFromUserID(this.userId).subscribe(
            response => {
              this.adminStaffData = response;
            },
            error => {
              console.log(error);
              this.handleErrorResponse(error);
            }
          )
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
