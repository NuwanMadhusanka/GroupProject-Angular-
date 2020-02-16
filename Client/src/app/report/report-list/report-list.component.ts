import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

import * as jspdf from 'jspdf';  
const html2canvas = require('../../../../node_modules/html2canvas'); 

interface TotalPacakgeIncome {
  packageName: string;
  payment: number;
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @ViewChild('screenshotCanvas') screenCanvas: ElementRef;


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

  totalPackageIncomeMonthly: TotalPacakgeIncome[]=[];
  totalOutcomeMonthly: OutComeDataMap = new OutComeDataMap(0,0,0,0);

  totalYearlyIncome: YearlyIncomeDataMap[] = [];

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
        this.totalPackageIncomeCalculate();
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
        this.totalOutComeCalculate();
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

  totalPackageIncomeCalculate(){
    this.totalPackageIncomeMonthly=[];
    let numOfPackages = this.packageMonthlyPayemntList[0].length;
    let numOfMonths = this.packageMonthlyPayemntList.length;

    for(let i=0 ; i<numOfPackages ; i++){
      let packageObject:TotalPacakgeIncome = {packageName:this.packageMonthlyPayemntList[0][i].packageName+'',payment:0};
      this.totalPackageIncomeMonthly[i]=packageObject;
    }
    
    for(let i=0 ; i<numOfMonths ; i++){
      for(let k=0 ; k<numOfPackages ; k++){
        let amount = this.totalPackageIncomeMonthly[k].payment;
        let payment = this.packageMonthlyPayemntList[i][k].payment;
        let totalAmount = amount+ (+payment);
        this.totalPackageIncomeMonthly[k].payment=totalAmount;
      }
    }
  }

  totalOutComeCalculate(){
    let totalInsuranceExpenses=0;
    let totalFuelExpenses=0;
    let totalVehicleMaintainanceExpenses=0;
    let totalSalaryExpenses=0;

    this.outComeMonthlyList.forEach(element => {
      totalFuelExpenses+=element.vehicleFuel;
      totalSalaryExpenses+=element.staffSalary;
      totalInsuranceExpenses+=element.vehicleInsurance;
      totalVehicleMaintainanceExpenses+=element.vehicleMaintainance;
    });
 
    this.totalOutcomeMonthly= new OutComeDataMap(totalInsuranceExpenses,totalVehicleMaintainanceExpenses,totalFuelExpenses,totalSalaryExpenses);
  }

 

  generatePDF(data,title){
    html2canvas(data, { allowTaint: true }).then(canvas => {

      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * -4);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      pdf.rect(20, 20, PDF_Width - 60, PDF_Height - 60, 'S');
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p');
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        pdf.rect(20, 20, PDF_Width - 60, PDF_Height - 60, 'S');
      }
       pdf.save(title+".pdf");
    });
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
