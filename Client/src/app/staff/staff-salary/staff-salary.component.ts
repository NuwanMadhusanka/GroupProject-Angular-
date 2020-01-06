import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { StaffWorkDaysDataMap } from '../../ClassModel/MapObject/StaffWorkDaysDataMap';
import { SalaryModel } from '../../ClassModel/SalaryModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { SalaryInformationModel } from '../../ClassModel/SalaryInformationModel';
import { AttendanceModel } from '../../ClassModel/MapObject/AttendanceModel';


@Component({
  selector: 'app-staff-salary',
  templateUrl: './staff-salary.component.html',
  styleUrls: ['./staff-salary.component.scss']
})
export class StaffSalaryComponent implements OnInit {

  userId:Number;
  staffData:StaffModel;
  isStaffDataLoad=false;

  monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  selectMonth:number;
  currentMonth:number;
  currentYear;number;
  errorMessage:String;

  staffWorkDays:StaffWorkDaysDataMap=new StaffWorkDaysDataMap(0,0,0,0,0);
  staffSalaryData:SalaryModel;
  isStaffSalaryDataLoad=false;
  staffSalaryInformation:SalaryInformationModel;
  isStaffSalaryInformationLoad=false;

  isSalaryPayedByAdmin=true;

  constructor(
    private staffService:StaffServiceService,
    private router:Router
  ) { }

  ngOnInit() {
    let role = +sessionStorage.getItem('userRole');
    this.userId = +sessionStorage.getItem('userId');
    if(role==1 || role==5){
      this.router.navigate(['/']);
    }
    this.getSatffData();
    this.getCurrentMonthAndYear();
  }

  getSatffData(){
    this.staffService.getStaffData(this.userId).subscribe(
      response => {
        this.staffData = response;
        this.isStaffDataLoad=true;
        this.getStaffSalaryData();
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getStaffSalaryData(){
    this.isStaffSalaryDataLoad=false;
    this.isSalaryPayedByAdmin=false;
    this.staffService.getStaffSalaryData(this.staffData.staffId,this.selectMonth+1,this.currentYear).subscribe(
      response => {
        this.staffSalaryData=response;
        if(+this.staffSalaryData.complete==1){
          this.getStaffWorkDays();
          this.getStaffSalaryInformation();
          this.isStaffSalaryDataLoad=true;
          this.isSalaryPayedByAdmin=true;
        }else{
          this.errorMessage="Salary not process.Please inform to administrator";
        }
      },
      error =>{
        this.errorMessage="Salary not process.Please inform to administrator";
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getStaffWorkDays(){
    this.staffService.getStaffWorkDays(this.staffData.staffId,this.selectMonth+1,this.currentYear).subscribe(
      response => {
        this.staffWorkDays = response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getStaffSalaryInformation(){
    this.staffService.getStaffRoleSalaryInformation(this.staffData.staffId,this.currentYear,this.currentMonth).subscribe(
      response => {
        this.staffSalaryInformation=response;
        this.isStaffSalaryInformationLoad=true;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getCurrentMonthAndYear(){
    var date = new Date(); 
    this.currentMonth=date.getMonth();
    this.selectMonth =this.currentMonth-1; //set current month as default selection

    this.currentYear=date.getFullYear();
  }

  selectMonths(index:number){
    this.errorMessage="";
    if(index<this.currentMonth){
      this.selectMonth=index;  
      this.getStaffSalaryData();
    }else{
      this.isSalaryPayedByAdmin=false;
      this.errorMessage="Salary not process yet.";
    }  
  }

  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
