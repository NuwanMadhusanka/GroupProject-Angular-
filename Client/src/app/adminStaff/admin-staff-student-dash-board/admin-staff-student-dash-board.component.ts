import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../../service/student/student-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { DatePipe } from '@angular/common';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

export class ExamList{
  constructor(
    public name,
    public nic
  ){}
}

@Component({
  selector: 'app-admin-staff-student-dash-board',
  templateUrl: './admin-staff-student-dash-board.component.html',
  styleUrls: ['./admin-staff-student-dash-board.component.scss']
})
export class AdminStaffStudentDashBoardComponent implements OnInit {
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;

  public lineChartOption: any;

  public writtenExamLineChartType;
  public writtenExamLineChartData:Array<any>;
  public writtenExamLineChartOptions:any;
  public writtenExamLineChartLabels:Array<any>;
  public writtenExamLineChartColors:Array<any>

  public trialExamLineChartType;
  public trialExamLineChartData:Array<any>;
  public trialExamLineChartOptions:any;
  public trialExamLineChartLabels:Array<any>;
  public trialExamLineChartColors:Array<any>

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }


  constructor(
    private studentService:StudentServiceService,
    private datePipe: DatePipe
  ) { }


  errorMessage;
  trialStudents:ExamList[]=[];//trial exam
  isTrialStudent=false;//trial exam
  examStudents:ExamList[]=[];//written exam
  isExamStudent=false;//written exam

  lineChartWrittenExamData=[];
  lineChartTrialExamData=[];

  ngOnInit() {
    this.studentTrialList();
    this.studentExamList();
    this.getlineChartWrittenExamData();
    this.getlineChartTrialExamData();

    this.chartColor = "#FFFFFF";

    

    this.lineChartOption = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.canvas = document.getElementById("writtenExamLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1,  this.hexToRGB('#18ce0f', 0.4));

    this.writtenExamLineChartData = [
        {
          label: "Pass Student Rate",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          data: [0,0,0, 0,0,0, 0, 0, 0, 0,0, 0]
        }
      ];
      this.writtenExamLineChartColors = [
       {
         borderColor: "#18ce0f",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#18ce0f",
         backgroundColor: this.gradientFill
       }
     ];
    this.writtenExamLineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.writtenExamLineChartOptions = this.lineChartOption;

    this.writtenExamLineChartType = 'line';

    this.canvas = document.getElementById("trialExamLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    this.trialExamLineChartData = [
        {
          label: "Pass Student Rate",
           pointBorderWidth: 2,
           pointHoverRadius: 4,
           pointHoverBorderWidth: 1,
           pointRadius: 4,
           fill: true,
           borderWidth: 2,
          data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
        }
      ];
      this.trialExamLineChartColors = [
       {
         borderColor: "#18ce0f",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#18ce0f",
         backgroundColor: this.gradientFill
       }
     ];
    this.trialExamLineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.trialExamLineChartOptions = this.lineChartOption;

    this.trialExamLineChartType = 'line';

  }

  studentTrialList(){
    let localdate=this.datePipe.transform(new Date(), 'yyyy-MM-dd')
     this.studentService.studentTrialList(localdate).subscribe(
      response => {
         this.trialStudents=response;
         if(this.trialStudents.length >0){
           this.isTrialStudent=true;
         }
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  studentExamList(){
    let localdate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let res = localdate.replace("IST", "SLST");
    this.studentService.studentExamList(localdate).subscribe(
      response => {
         this.examStudents=response;
         if(this.examStudents.length >0){
           this.isExamStudent=true;
         }
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  generatePdf(title){

    var doc = new jsPDF('p','pt');

    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');//page Border
    doc.setFontType("bold");
    doc.text("Drivo Learners",250,40);
 
    
    var res = doc.autoTableHtmlToJson(document.getElementById("trial-table"));
    
    var today = new Date();
    var year=today.getFullYear();
    var month=today.getMonth();
    var date=today.getDate();
    var header = function(data) {
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text(title, data.settings.margin.left, 70);
    };
  
    var options = {
      beforePageContent: header,
      margin: {
        top: 80
      },
      startY: doc.autoTableEndPosY() + 90
    };
    
    doc.autoTable(res.columns, res.data, options);
    doc.text("Date:"+year+"/"+month+"/"+date,30,doc.internal.pageSize.height-50);
    doc.text("Signature",480,doc.internal.pageSize.height-50);
  
    let localdate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let saveFileName=title+' '+localdate+' .pdf'
    doc.save(saveFileName);
  }

  //line chart data wrriten exam result
  getlineChartWrittenExamData(){
    this.studentService.studentExamResult(1).subscribe(
      response => {
         this.lineChartWrittenExamData=response;

         this.writtenExamLineChartData = [
          {
            data: [this.lineChartWrittenExamData[0], this.lineChartWrittenExamData[1], this.lineChartWrittenExamData[2],  
                   this.lineChartWrittenExamData[3], this.lineChartWrittenExamData[4], this.lineChartWrittenExamData[5], 
                   this.lineChartWrittenExamData[6], this.lineChartWrittenExamData[7], this.lineChartWrittenExamData[8],
                   this.lineChartWrittenExamData[9], this.lineChartWrittenExamData[10], this.lineChartWrittenExamData[11]]
          }
        ];
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }


   //line chart data wrriten exam result
   getlineChartTrialExamData(){
    this.studentService.studentExamResult(2).subscribe(
      response => {
        
         this.lineChartTrialExamData=response;

         this.trialExamLineChartData = [
          {
            data: [this.lineChartTrialExamData[0], this.lineChartTrialExamData[1], this.lineChartTrialExamData[2],  
                   this.lineChartTrialExamData[3], this.lineChartTrialExamData[4], this.lineChartTrialExamData[5], 
                   this.lineChartTrialExamData[6], this.lineChartTrialExamData[7], this.lineChartTrialExamData[8],
                   this.lineChartTrialExamData[9], this.lineChartTrialExamData[10], this.lineChartTrialExamData[11]]
          }
        ];
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  handleErrorResponse(error:HttpErrorResponse){
    this.errorMessage="Something bad happened; please try again later.";
    let httpError =new HttpError();
    httpError.ErrorResponse(error);
  }

}
