import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../../service/student/student-service.service';
import { PackagePaymentDataMap } from '../../ClassModel/MapObject/PackagePaymentDataMap';
import { ReportServiceService } from '../../service/report/report-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {


  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  reportsTypes = ["Income","Outcome","Profit"];
  selectedReportType:number;
 
  types = ["Monthly","Yearly"];
  selectedType:number;

  monthlyYears = [2019,2020];
  annualYears = [2019];
  selectedYear:number;
  currentYear:number;

  packageMonthlyPayemntList: [[PackagePaymentDataMap]] ;

  constructor(
    private reportService :ReportServiceService
  ) { }

  ngOnInit() {
    this.getCurrentYear();
    this.selectedType=0;
    this.selectedYear=this.currentYear;
    this.selectedReportType=0;
    this.getReportData();
  }

  getCurrentYear(){
    var date = new Date(); 
    this.currentYear=date.getFullYear();   
  }

  getSelectType(index:number){
    this.selectedYear=this.currentYear;
    this.selectedType=index;
    this.getReportData();
  }

  getSelectYear(year:number){
    this.selectedYear=year;
    this.getReportData();
  }

  selectReportType(index:number){
    this.selectedReportType=index;
    this.getReportData();
  }

  getReportData(){
    if(this.selectedType==0){
      if(this.selectedReportType==0){
        this.getMonthlyIncome();
      }
    }
    if(this.selectedType==1){

    }
  }

  getMonthlyIncome(){
    this.reportService.getPackagePaymentMonthly(this.selectedYear).subscribe(
      response => {
        this.packageMonthlyPayemntList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getMonthlyOutCome(){

  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
