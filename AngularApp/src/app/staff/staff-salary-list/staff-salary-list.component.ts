import { Component, OnInit } from '@angular/core';
import { SalaryModel } from '../../ClassModel/SalaryModel';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { Router } from '@angular/router';


@Component({
  selector: 'app-staff-salary-list',
  templateUrl: './staff-salary-list.component.html',
  styleUrls: ['./staff-salary-list.component.scss']
})
export class StaffSalaryListComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  selectMonth:number;
  currentMonth:number;

  staffSalaryList:SalaryModel[]=[];
  
  errorMessage:String;

  constructor(
    private staffService : StaffServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getCurrentMonth();
    this.getStaffSalaryDetails();
  }

  getStaffSalaryDetails(){
    this.staffService.getStaffSalaryDetails(this.selectMonth+1).subscribe(
      response => {
        this.staffSalaryList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getCurrentMonth(){
    var date = new Date(); 
    this.currentMonth=date.getMonth();
    this.selectMonth =this.currentMonth; //set current month as default selection
  }

  selectMonths(index:number){
    this.errorMessage="";
    if(index<=this.currentMonth){
      this.selectMonth=index;
      this.getStaffSalaryDetails();
    }else{
      this.errorMessage="Cannot select future months";
    }  
  }

  staffSalaryPay(staffId:Number){
    this.router.navigate(['staff-salary-pay',staffId,this.selectMonth+1]);
  }

  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
