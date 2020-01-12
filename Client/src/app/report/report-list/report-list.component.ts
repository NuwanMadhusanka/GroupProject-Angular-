import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { PackagePaymentDataMap } from '../../ClassModel/MapObject/PackagePaymentDataMap';
import { ReportServiceService } from '../../service/report/report-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { OutComeDataMap } from '../../ClassModel/MapObject/OutComeDataMap';
import { ProfitDataMap } from '../../ClassModel/MapObject/ProfitDataMap';
import { YearlyIncomeDataMap } from '../../ClassModel/MapObject/YearlyIncomeDataMap';
import { YearlyOutcomeDataMap } from '../../ClassModel/MapObject/YearlyOutcomeDataMap';
import { YearlyProfitDataMap } from '../../ClassModel/MapObject/YearlyProfitDataMap';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');


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

  monthlyYears = [];
  selectedYear:number;
  currentYear:number;

  packageMonthlyPayemntList: [[PackagePaymentDataMap]] ;
  outComeMonthlyList:[OutComeDataMap] ;
  profitMonthlyList:[ProfitDataMap] ;
  yearlyIncomeList:[YearlyIncomeDataMap] ;
  yearlyOutcomeList:[YearlyOutcomeDataMap] ;
  yearlyProfitList:[YearlyProfitDataMap] ;

  totalIncome:number=0;
  totalOutCome:number=0;
  totalProfit:number=0;

  constructor(
    private reportService :ReportServiceService
  ) { }

  ngOnInit() {
    this.getCurrentYear();
    this.getYearList();
    this.selectedType=0;
    this.selectedYear=this.currentYear;
    this.selectedReportType=0;
    this.getReportData();
  }

  getYearList(){
    this.reportService.getYearList().subscribe(
      response => {
        this.monthlyYears = response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
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
      if(this.selectedReportType==1){
        this.getMonthlyOutCome();
      }
      if(this.selectedReportType==2){
        this.getMonthlyProfit();
      }
    }

    if(this.selectedType==1){
     if(this.selectedReportType==0){
       this.getYearlyIncome();
     }
     if(this.selectedReportType==1){
       this.getYearlyOutcome();
     }
     if(this.selectedReportType==2){
       this.getYearlyProfit();
     }
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
    this.reportService.getOutComeMonthly(this.selectedYear).subscribe(
      response => {
        this.outComeMonthlyList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getMonthlyProfit(){
    this.reportService.getProfitMonthly(this.selectedYear).subscribe(
      response => {
        this.profitMonthlyList = response;
        this.calculateTotal(this.profitMonthlyList);
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  
  getYearlyIncome(){
    this.reportService.getYearlyIncome().subscribe(
      response => {
        this.yearlyIncomeList = response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getYearlyOutcome(){
    this.reportService.getYearlyOutcome().subscribe(
      response => {
        this.yearlyOutcomeList = response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getYearlyProfit(){
    this.reportService.getYearlyProfit().subscribe(
      response => {
        this.yearlyProfitList=response;
        console.log(this.selectedReportType)
        console.log(this.selectedType)
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  calculateTotal(dataList:[ProfitDataMap]){
    let totalIncome=0;
    let totalOutCome=0;
    let totalProfit=0;
    dataList.forEach(element => {
      totalIncome+=element.income;
      totalOutCome+=element.outcome;
      totalProfit+=element.profit;
    });
    this.totalIncome=totalIncome;
    this.totalOutCome=totalOutCome;
    this.totalProfit=totalProfit;
  }

 

  generatePDF(){
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    mywindow.document.write(`<html><head><title>Report</title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById('monthlyIncomeReport').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
