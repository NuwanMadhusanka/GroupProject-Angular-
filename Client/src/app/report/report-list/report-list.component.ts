import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { PackagePaymentDataMap } from '../../ClassModel/MapObject/PackagePaymentDataMap';
import { ReportServiceService } from '../../service/report/report-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { OutComeDataMap } from '../../ClassModel/MapObject/OutComeDataMap';
import { ProfitDataMap } from '../../ClassModel/MapObject/ProfitDataMap';


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
  outComeMonthlyList:[OutComeDataMap] ;
  profitMonthlyList:[ProfitDataMap] ;

  totalIncome:number=0;
  totalOutCome:number=0;
  totalProfit:number=0;

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
      if(this.selectedReportType==1){
        this.getMonthlyOutCome();
      }
      if(this.selectedReportType==2){
        this.getMonthlyProfit();
      }
    }

    if(this.selectedType==1){
     // this.annualReport();
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

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
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

  // annualReport(){
  //   var chart = new CanvasJS.Chart("chartContainer", {
  //     title: {
  //       text: "House Median Price"
  //     },
  //     axisX: {
  //       valueFormatString: "MMM YYYY"
  //     },
  //     axisY2: {
  //       title: "Median List Price",
  //       prefix: "$",
  //       suffix: "K"
  //     },
  //     toolTip: {
  //       shared: true
  //     },
  //     legend: {
  //       cursor: "pointer",
  //       verticalAlign: "top",
  //       horizontalAlign: "center",
  //       dockInsidePlotArea: true,
  //       // itemclick: toogleDataSeries
  //     },
  //     data: [{
  //       type:"line",
  //       axisYType: "secondary",
  //       name: "San Fransisco",
  //       showInLegend: true,
  //       markerSize: 0,
  //       yValueFormatString: "$#,###k",
  //       dataPoints: [		
  //         { x: new Date(2014,0,1), y: 850 },
  //         { x: new Date(2014,1,1), y: 889 },
  //         { x: new Date(2014,2,1), y: 890 },
  //         { x: new Date(2014,3,1), y: 899 },
  //         { x: new Date(2014,4, 1), y: 903 },
  //         { x: new Date(2014,5, 1), y: 925 },
  //         { x: new Date(2014,6, 1), y: 899 },
  //         { x: new Date(2014,7, 1), y: 875 },
  //         { x: new Date(2014,8, 1), y: 927 },
  //         { x: new Date(2014,9, 1), y: 949 },
  //         { x: new Date(2014, 10, 1), y: 946 },
  //         { x: new Date(2014, 11, 1), y: 927 },
  //         { x: new Date(2015,0, 1), y: 950 },
  //         { x: new Date(2015,1, 1), y: 998 },
  //         { x: new Date(2015, 2, 1), y: 998 },
  //         { x: new Date(2015, 3, 1), y: 1050 },
  //         { x: new Date(2015, 4, 1), y: 1050 },
  //         { x: new Date(2015, 5, 1), y: 999 },
  //         { x: new Date(2015, 6, 1), y: 998 },
  //         { x: new Date(2015, 7, 1), y: 998 },
  //         { x: new Date(2015, 8, 1), y: 1050 },
  //         { x: new Date(2015, 9, 1), y: 1070 },
  //         { x: new Date(2015, 10, 1), y: 1050 },
  //         { x: new Date(2015, 11, 1), y: 1050 },
  //         { x: new Date(2016, 0, 1), y: 995 },
  //         { x: new Date(2016, 1, 1), y: 1090 },
  //         { x: new Date(2016, 2, 1), y: 1100 },
  //         { x: new Date(2016, 3, 1), y: 1150 },
  //         { x: new Date(2016, 4, 1), y: 1150 },
  //         { x: new Date(2016, 5, 1), y: 1150 },
  //         { x: new Date(2016, 6, 1), y: 1100 },
  //         { x: new Date(2016, 7, 1), y: 1100 },
  //         { x: new Date(2016, 08, 1), y: 1150 },
  //         { x: new Date(2016, 09, 1), y: 1170 },
  //         { x: new Date(2016, 10, 1), y: 1150 },
  //         { x: new Date(2016, 11, 1), y: 1150 },
  //         { x: new Date(2017, 0, 1), y: 1150 },
  //         { x: new Date(2017, 1, 1), y: 1200 },
  //         { x: new Date(2017, 2, 1), y: 1200 },
  //         { x: new Date(2017,3, 1), y: 1200 },
  //         { x: new Date(2017,4, 1), y: 1190 },
  //         { x: new Date(2017, 5, 1), y: 1170 }
  //       ]
  //     },
  //     {
  //       type: "line",
  //       axisYType: "secondary",
  //       name: "Manhattan",
  //       showInLegend: true,
  //       markerSize: 0,
  //       yValueFormatString: "$#,###k",
  //       dataPoints: [
  //         { x: new Date(2014, 0, 1), y: 1200 },
  //         { x: new Date(2014, 1, 1), y: 1200 },
  //         { x: new Date(2014, 2, 1), y: 1190 },
  //         { x: new Date(2014, 3, 1), y: 1180 },
  //         { x: new Date(2014, 4, 1), y: 1250 },
  //         { x: new Date(2014, 5, 1), y: 1270 },
  //         { x: new Date(2014, 6, 1), y: 1300 },
  //         { x: new Date(2014, 7, 1), y: 1300 },
  //         { x: new Date(2014, 8, 1), y: 1358 },
  //         { x: new Date(2014, 9, 1), y: 1410 },
  //         { x: new Date(2014, 10, 1), y: 1480 },
  //         { x: new Date(2014, 11, 1), y: 1500 },
  //         { x: new Date(2015, 0, 1), y: 1500 },
  //         { x: new Date(2015, 1, 1), y: 1550 },
  //         { x: new Date(2015, 2, 1), y: 1550 },
  //         { x: new Date(2015, 3, 1), y: 1590 },
  //         { x: new Date(2015, 4, 1), y: 1600 },
  //         { x: new Date(2015,5, 1), y: 1590 },
  //         { x: new Date(2015, 6, 1), y: 1590 },
  //         { x: new Date(2015, 7, 1), y: 1620 },
  //         { x: new Date(2015, 8, 1), y: 1670 },
  //         { x: new Date(2015, 9, 1), y: 1720 },
  //         { x: new Date(2015, 10, 1), y: 1750 },
  //         { x: new Date(2015, 11, 1), y: 1820 },
  //         { x: new Date(2016, 0, 1), y: 2000 },
  //         { x: new Date(2016, 1, 1), y: 1920 },
  //         { x: new Date(2016, 2, 1), y: 1750 },
  //         { x: new Date(2016, 3, 1), y: 1850 },
  //         { x: new Date(2016, 4, 1), y: 1750 },
  //         { x: new Date(2016, 5, 1), y: 1730 },
  //         { x: new Date(2016, 6, 1), y: 1700 },
  //         { x: new Date(2016, 7, 1), y: 1730 },
  //         { x: new Date(2016, 08, 1), y: 1720 },
  //         { x: new Date(2016, 09, 1), y: 1740 },
  //         { x: new Date(2016, 10, 1), y: 1750 },
  //         { x: new Date(2016, 11, 1), y: 1750 },
  //         { x: new Date(2017,0, 1), y: 1750 },
  //         { x: new Date(2017, 1, 1), y: 1770 },
  //         { x: new Date(2017, 2, 1), y: 1750 },
  //         { x: new Date(2017, 3, 1), y: 1750 },
  //         { x: new Date(2017, 4, 1), y: 1730 },
  //         { x: new Date(2017, 5, 1), y: 1730 }
  //       ]
  //     }
  //     ]
  //   });
  //   chart.render();
    
  // }

}
