import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ReportServiceService } from '../service/report/report-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public incomeLineChartType;
  public incomeLineChartData:Array<any>;
  public incomeLineChartOptions:any;
  public incomeLineChartLabels:Array<any>;
  public incomeLineChartColors:Array<any>;

  public outcomeLineChartType;
  public outcomeLineChartData:Array<any>;
  public outcomeLineChartOptions:any;
  public outcomeLineChartLabels:Array<any>;
  public outcomeLineChartColors:Array<any>;

  public salaryLineChartType;
  public salaryLineChartData:Array<any>;
  public salaryLineChartOptions:any;
  public salaryLineChartLabels:Array<any>;
  public salaryLineChartColors:Array<any>

  public fuelLineChartType;
  public fuelLineChartData:Array<any>;
  public fuelLineChartOptions:any;
  public fuelLineChartLabels:Array<any>;
  public fuelLineChartColors:Array<any>

  public insuranceLineChartType;
  public insuranceLineChartData:Array<any>;
  public insuranceLineChartOptions:any;
  public insuranceLineChartLabels:Array<any>;
  public insuranceLineChartColors:Array<any>

  monthlyProfit = [];
  monthlyIncome = [];

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
    private reportService :ReportServiceService
  ) { }

  ngOnInit() {
    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("profitChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.getMonthlyProfit();
    this.lineBigDashboardChartData = [
        {
          label: "Profit",

          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,

          borderWidth: 2,
          data: [-50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
        }
      ];
      this.lineBigDashboardChartColors = [
       {
         backgroundColor: this.gradientFill,
         borderColor: this.chartColor,
         pointBorderColor: this.chartColor,
         pointBackgroundColor: "#2c2c2c",
         pointHoverBackgroundColor: "#2c2c2c",
         pointHoverBorderColor: this.chartColor,
       }
     ];
    this.lineBigDashboardChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    this.lineBigDashboardChartOptions = {

          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 0,
                  bottom: 0
              }
          },
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          legend: {
              position: "bottom",
              fillStyle: "#FFF",
              display: false
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10
                  },
                  gridLines: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent"
                  }

              }],
              xAxes: [{
                  gridLines: {
                      zeroLineColor: "transparent",
                      display: false,

                  },
                  ticks: {
                      padding: 10,
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold"
                  }
              }]
          }
    };

    this.lineBigDashboardChartType = 'line';


    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
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

    //Income Line Chart Start
    this.getIncome();
    this.canvas = document.getElementById("incomeLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    this.incomeLineChartData = [
        {
          label: "Income (Rs)",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }
      ];
      this.incomeLineChartColors = [
       {
         borderColor: "#18ce0f",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#18ce0f",
         backgroundColor: this.gradientFill
       }
     ];
    this.incomeLineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.incomeLineChartOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.incomeLineChartType = 'line';
    //Income Line Chart Finish

    //outcome Line chart start
    this.delay(3000).then(any=>{
      this.getOutCome();
    });
    this.canvas = document.getElementById("outcomeLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));

    this.outcomeLineChartData = [
        {
          label: "Outcome (Rs)",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }
      ];
      this.outcomeLineChartColors = [
       {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
       }
     ];
    this.outcomeLineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.outcomeLineChartOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.outcomeLineChartType = 'line';
    //outcome linechart finish

    //Salary Chart Start
    this.getMonthlySalaryExpenses();
    this.canvas = document.getElementById("salaryLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));

    this.salaryLineChartData = [
        {
          label: "Salary Payment (Rs)",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }
      ];
      this.salaryLineChartColors = [
       {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
       }
     ];
    this.salaryLineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.salaryLineChartOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.salaryLineChartType = 'line';
    //Salary Chart Finish

    //Fuel Chart Start
    this.getFuelExpenses();
    this.canvas = document.getElementById("fuelLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));

    this.fuelLineChartData = [
        {
          label: "Fuel Payment (Rs)",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
        }
      ];
      this.fuelLineChartColors = [
       {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
       }
     ];
    this.fuelLineChartLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.fuelLineChartOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.fuelLineChartType = 'line';
    //Fuel Chart Finish


    //Insurance Chart Start
    this.getInsuranceExpenses();
    this.canvas = document.getElementById("insuranceLineChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.insuranceLineChartData = [
        {
          label: "Insurance Payment (Rs)",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
        }
      ];
    this.insuranceLineChartColors = [
     {
       backgroundColor: this.gradientFill,
       borderColor: "#2CA8FF",
       pointBorderColor: "#FFF",
       pointBackgroundColor: "#2CA8FF",
     }
   ];
    this.insuranceLineChartLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.insuranceLineChartOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.insuranceLineChartType = 'line';
     //Insurance Chart Finish
   }

   getMonthlyProfit(){
    this.reportService.getMonthlyProfit().subscribe(
      response => {
        let result = [];
        this.monthlyProfit=response;
        result = response;
        
        this.lineBigDashboardChartData = [
          {
              data: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]]
          }
        ];
      },
      error => {
        console.log(error);
      }
    );
   }

   getMonthlySalaryExpenses(){
     this.reportService.getMonthlySalaryExpenses().subscribe(
       response => {
          let result = [];
          result=response;

          this.salaryLineChartData = [
            {
              data: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]]
            }
          ];

       },
       error => {
         console.log(error);
       }
     );
   }

   getFuelExpenses(){
     this.reportService.getFuelExpenses().subscribe(
       response => {
         let result = [];
         result=response;
         this.fuelLineChartData = [
          {
            data: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]]
          }
        ];
       },
       error => {
         console.log(error);
       }
     );
   }

   getInsuranceExpenses(){
     this.reportService.getInsuranceExpenses().subscribe(
       response => {
         let result = [];
         result=response;
         this.insuranceLineChartData = [
          {
            data: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]]
          }
        ];
       },
       error => {
         console.log(error);
       }
     );
   }

   getIncome(){
     this.reportService.getIncome().subscribe(
       response => {
         this.monthlyIncome=response;
         let result = [];
         result=response;
         this.incomeLineChartData = [
          {
            data: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]]
          }
        ];
       }
     );
   }

   getOutCome(){
      let outCome = [];
      let result = [];
      for (let i = 0; i < 12; i++) {
        outCome.push((+this.monthlyIncome[i])-(+this.monthlyProfit[i]));
      }
      
      result=outCome;
      console.log(result);
      this.outcomeLineChartData = [
        {
          data: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]]
        }
      ];
   }

   async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
}
