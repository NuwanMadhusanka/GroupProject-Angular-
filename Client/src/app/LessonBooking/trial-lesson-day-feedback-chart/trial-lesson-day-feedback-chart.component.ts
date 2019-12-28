import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { LessonDayFeedbackChartDataMap } from '../../ClassModel/MapObject/LessonDayFeedbackChartDataMap';
import { LessonBookingService } from '../../service/LessonBooking/lesson-booking.service';

@Component({
  selector: 'app-trial-lesson-day-feedback-chart',
  templateUrl: './trial-lesson-day-feedback-chart.component.html',
  styleUrls: ['./trial-lesson-day-feedback-chart.component.scss']
})
export class TrialLessonDayFeedbackChartComponent implements OnInit {

  @Input() packageId;
  @Input() packageTitle;
  @Input() transmission;

  transmissionType;

  chartData:LessonDayFeedbackChartDataMap[];
  chartNames:String[]=[];

  constructor(
    public activeModal: NgbActiveModal,
    public lessonBookingService:LessonBookingService
  ) { }

  ngOnInit() {

    this.lessonBookingService.lessonFeedbackChartData(this.packageId,this.transmission).subscribe(
      response => {
        this.chartData=response;
        console.log(this.chartData)
      },
      error => {
        console.log(error);
      }
    );

    if(this.transmission==1){
      this.transmissionType="Manual";
    }else{
      this.transmissionType="Auto";
    }  
  }

  // designChart(data:LessonDayFeedbackChartDataMap){
   
  //   var chart = new CanvasJS.Chart("chartContainer"+data.timeSlot.timeSlotId, {
  //     theme: "dark2", // "light2", "dark1", "dark2"
  //     animationEnabled: false, // change to true		
  //     title:{
  //       text: data.timeSlot.startTime+" : "+data.timeSlot.finishTime
  //     },
  //     data: [
  //     {
  //       // Change type to "bar", "area", "spline", "pie",etc.
  //       type: "column",
  //       dataPoints: [
  //         { label: "Monday",  y: data.count[1] , color:'#ADD8E6'},
  //         { label: "Tuesday", y: data.count[2] , color:'#ADD8E6' },
  //         { label: "Wednesday", y: data.count[3] , color:'#ADD8E6' },
  //         { label: "Thursday",  y: data.count[4] , color:'#ADD8E6' },
  //         { label: "Friday",  y: data.count[5] , color:'#ADD8E6' },
  //         { label: "Saturday",  y: data.count[6] , color:'#ADD8E6' },
  //         { label: "Sunday",  y: data.count[0] , color:'#ADD8E6' }
  //       ]
  //     }
  //     ]
  //   });
  //   chart.render();
  // }

  // async delay(ms: number) {
  //   await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  // }
}


