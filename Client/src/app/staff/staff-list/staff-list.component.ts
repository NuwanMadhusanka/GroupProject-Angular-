import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { StaffModel } from '../../ClassModel/StaffModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  staffList:StaffModel[]=[];
  adminStaffList:StaffModel[]=[];
  instructorList:StaffModel[]=[];

  constructor(
    private staffService :StaffServiceService
  ) { }

  ngOnInit() {
    this.getStaffList();
  }

  getStaffList(){
    this.staffService.getStaffList().subscribe(
      response => {
        this.staffList=response;
        this.staffList.forEach(staff => {
          if(staff.userId.role==4){
            this.instructorList.push(staff);
          }else{
            this.adminStaffList.push(staff);
          }
        });
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
