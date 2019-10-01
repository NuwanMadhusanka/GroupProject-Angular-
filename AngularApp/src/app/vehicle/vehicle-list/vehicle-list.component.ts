import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {

 
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;

  

  public gradientChartOptionsConfiguration: any;

  public barChartType;
  public barChartData:Array<any>;
  public barChartOptions:any;
  public barChartLabels:Array<any>;
  public barChartColors:Array<any>


  constructor() { }

  ngOnInit() {
    this.chartColor = "#FFFFFF";
   


    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      responsive: 1,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      },
      weight :5
    };

   

    this.canvas = document.getElementById("barChartStudentPractrical");
    this.ctx = this.canvas.getContext("2d");

    this.barChartData = [
        {
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          data: [15, 5, 10]
        }
      ];
      this.barChartColors = [
       {
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#f96332",
         backgroundColor: [
           'green','red','orange'
         ]
       }
     ];
    this.barChartLabels = ["Complete","Not Complete","Remain Lesson"];
    this.barChartOptions = this.gradientChartOptionsConfiguration;

    this.barChartType = 'doughnut';


    }
}

