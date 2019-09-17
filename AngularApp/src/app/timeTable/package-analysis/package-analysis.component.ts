import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PackageServiceService } from '../../service/package/package-service.service';
import { PackageModel } from '../../ClassModel/PackageModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { TimeTableServiceService } from '../../service/TimeTable/time-table-service.service';
import { LessonDistributionMap } from '../../ClassModel/MapObject/LessonDistributionMap';
import { hasClassName } from '@ng-bootstrap/ng-bootstrap/util/util';
import { LessonModel } from '../../ClassModel/LessonModel';
import { TimeTableDataList } from '../../ClassModel/MapObject/TimeTableDataList';
import { PackageAnalysisData } from '../../ClassModel/MapObject/PackageAnalysisData';
import { TimeSlotModel } from '../../ClassModel/TimeSlotModel';

@Component({
  selector: 'app-package-analysis',
  templateUrl: './package-analysis.component.html',
  styleUrls: ['./package-analysis.component.scss']
})
export class PackageAnalysisComponent implements OnInit {

  packageList:PackageModel[]=[];
  selectPackage:PackageModel;

  isManual;
  manualTotalStudent;
  manualTotalLesson:number=0;
  isManualLessonMore;

  isAuto;
  autoTotalStudent;

  isManualLessonAnalysisActive=false;
  isManualTableActive=false;
  lessonTimePeriodManual;
  studentTimePeriodManual;
  vehicleCategoryManual;
  numStudentForOneVehicleManual;
  manualTotalLessonRecommend;
  manualLessonTimeTable:PackageAnalysisData[]=[];
  timeSlotIdManual:TimeSlotModel[]=[];
  errorMsgStudentTimePeriodManual;
  errorMsgLessonTimePeriodManual;

  isAutoLessonAnalysisActive=false;
  lessonTimePeriodAuto=0;
  studentTimePeriodAuto=0;
  vehicleCategoryAuto;
  numStudentForOneVehicleAuto;
  autoTotalLessonRecommend;
  autoLessonTimeTable:PackageAnalysisData[]=[];
  timeSlotIdAuto:TimeSlotModel[]=[];
  errorMsgStudentTimePeriodAuto;
  errorMsgLessonTimePeriodAuto;

  vehicleCategory;
  errorMessage;
 
 
  public canvas : any;
  public ctx;
  public gradientFill;


  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public ManualLessonChartClicked(e:any){
    this.isManualLessonMore=false;
    if(e['active'].length > 0){
      //console.log(e['active'][0]['_index']);
      let index=e['active'][0]['_index'];
      this.ManualLessonMoreGraph();
    }
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
    private packageService:PackageServiceService,
    private timeTableService:TimeTableServiceService
  ) { }

  ngOnInit() {
    this.getpackageList();

    // Manual Lesson Graph Initialize
    this.canvas = document.getElementById("manualLessonChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
        {
          label: "Lessons",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [2, 0, 3, 0, 1, 0, 2]
        }
      ];
    this.lineChartGradientsNumbersColors = [
     {
       backgroundColor: this.gradientFill,
       borderColor: "#2CA8FF",
       pointBorderColor: "#FFF",
       pointBackgroundColor: "#2CA8FF",
     }
   ];
    this.lineChartGradientsNumbersLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this.lineChartGradientsNumbersOptions = {
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
        responsive: 1,
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
      }

    this.lineChartGradientsNumbersType = 'bar';
    // Finish Manual Lesson Graph Initialization
    
//--------------------------------------------------------------------------------------------------
    
    // Manual Lesson More Details Graph Initialize
    this.canvas = document.getElementById("manualLessonMoreChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
        {
          label: "Students",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [2, 0, 3, 0, 1, 0, 2]
        }
      ];
    this.lineChartGradientsNumbersColors = [
     {
       backgroundColor: this.gradientFill,
       borderColor: "#2CA8FF",
       pointBorderColor: "#FFF",
       pointBackgroundColor: "#2CA8FF",
     }
   ];
    this.lineChartGradientsNumbersLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this.lineChartGradientsNumbersOptions = {
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
        responsive: 1,
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
      }

    this.lineChartGradientsNumbersType = 'bar';
    // Finish Manual Lesson More Details Graph Initialization
  }

  //get package details
  getpackageList(){
    this.packageService.packageList().subscribe(
      response => {
        this.packageList=response;
        },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  lessonAnalysis(transmissionType){
    this.packageService.getNumStudentPackage(this.selectPackage.packageId,transmissionType).subscribe(
      response => {
        (transmissionType == 1 ? this.isManual=true : this.isAuto=true);
        (transmissionType == 1 ? this.manualTotalStudent=response : this.autoTotalStudent=response);
        (transmissionType == 1 ? this.getLessonDistributionDetails(transmissionType) : "");
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  manualLessonGraph(lessonDistribution:LessonDistributionMap[]){
    
    // index:
    // 0 -> Sunday
    // 1 -> Monday
    let array=[0,0,0,0,0,0,0];
    this.manualTotalLesson=0;
    lessonDistribution.forEach(element => {
      array[+element.day]=element.lessonCount;
      this.manualTotalLesson+=+element.lessonCount;
    });
   

    this.lineChartGradientsNumbersData = [
      {
        label: "Lessons",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: [array[1], array[2], array[3],array[4], array[5], array[6], array[0]]
      }
    ];
  }
  ManualLessonMoreGraph(){
    this.isManualLessonMore=true;
  }

  //get number of lessons per week days
  getLessonDistributionDetails(transmission){
    this.timeTableService.getLessonDistributionDetails(this.selectPackage.packageId,transmission).subscribe(
      response => {
        let lessonDistribution:LessonDistributionMap[] = response;
        (transmission == 1 ? this.manualLessonGraph(lessonDistribution) : "");
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  //buttons
  selectPackageDetails(selectpackage:PackageModel){
    
    this.isAuto=false;
    this.isManual=false;

    this.selectPackage=selectpackage;

    if(selectpackage.manualLes>0){
      this.lessonAnalysis(1);
      this.lessonTimeTable(1);
    }

    if(selectpackage.autoLes>0){
      this.lessonAnalysis(2);
      this.lessonTimeTable(2);
    }
    
  }


  lessonAnalysisReport(transmission){

        let lessonTimePeriod;
        let studentTimePeriod;
        let totalStudent;

        if(transmission == 1){
          this.isManualLessonAnalysisActive=false;
          this.errorMsgLessonTimePeriodManual=false;
          this.errorMsgStudentTimePeriodManual=false;
          lessonTimePeriod=this.lessonTimePeriodManual;
          studentTimePeriod=this.studentTimePeriodManual;
          totalStudent=this.manualTotalStudent;
        }else{
          this.isAutoLessonAnalysisActive=false;
          this.errorMsgLessonTimePeriodAuto=false;
          this.errorMsgStudentTimePeriodAuto=false;
          lessonTimePeriod=this.lessonTimePeriodAuto;
          studentTimePeriod=this.studentTimePeriodAuto;
          totalStudent=this.autoTotalStudent;
        }
        
        if(totalStudent>0){
            let errorMsg=false;
            if(lessonTimePeriod==null){
              let error = "Insert Valid Lesson Time Period";
              (transmission==1 ? this.errorMsgLessonTimePeriodManual=error : this.errorMsgLessonTimePeriodAuto=error);
              errorMsg=true;
            }
            if(studentTimePeriod==null){
              let error = "Insert Valid Time Period";
              (transmission==1 ? this.errorMsgStudentTimePeriodManual=error : this.errorMsgStudentTimePeriodAuto=error);
              errorMsg=true;
            }
          
          

            if(!errorMsg){
              if( (lessonTimePeriod>0) && (studentTimePeriod>0)  &&  (+studentTimePeriod <= +lessonTimePeriod)){
                    this.vehicleCategory=this.selectPackage.vehicleCategoryId.category;
                    let numStudentForOneVehicle=this.selectPackage.vehicleCategoryId.numStudent;
                    let numOfStudentPerOneLesson=lessonTimePeriod/studentTimePeriod;
                    numOfStudentPerOneLesson=Math.floor(numOfStudentPerOneLesson);

                    let temporyNumberOfLesson = 0;
                    temporyNumberOfLesson=totalStudent/numOfStudentPerOneLesson
                    temporyNumberOfLesson=Math.ceil( temporyNumberOfLesson );
                    
                    if(numOfStudentPerOneLesson > numStudentForOneVehicle){
                      
                      let remainStudentForOneLesson = numOfStudentPerOneLesson-numStudentForOneVehicle;
                      let totalRemainStudent = remainStudentForOneLesson*temporyNumberOfLesson;

                      if(totalStudent%numOfStudentPerOneLesson > 0){
                        temporyNumberOfLesson-=1;
                        let remainStudentForLesson=totalStudent%numOfStudentPerOneLesson;

                        if(remainStudentForLesson < remainStudentForOneLesson){
                          totalRemainStudent = totalRemainStudent - (remainStudentForOneLesson-remainStudentForLesson);
                        }
                        if(remainStudentForLesson > remainStudentForOneLesson){
                          totalRemainStudent = totalRemainStudent + (remainStudentForLesson-remainStudentForOneLesson);
                        }
                      }

                      let extranLesson =Math.ceil(totalRemainStudent/numStudentForOneVehicle);
                      let recommendLesson=temporyNumberOfLesson + extranLesson;
                    
                      (transmission==1 ? this.numStudentForOneVehicleManual=numStudentForOneVehicle : this.numStudentForOneVehicleAuto=numStudentForOneVehicle);
                      (transmission==1 ? this.manualTotalLessonRecommend=recommendLesson : this.autoTotalLessonRecommend=recommendLesson);
                      

                    }else{
                      (transmission==1 ? this.manualTotalLessonRecommend=temporyNumberOfLesson : this.autoTotalLessonRecommend=temporyNumberOfLesson);
                    }

                    (transmission==1 ? this.isManualLessonAnalysisActive=true : this.isAutoLessonAnalysisActive=true);
              }else{
                let error="Student TimePeriod Should be lessthan or equal to Lesson TimePeriod(Time Period Should be greater than Zero)";
                (transmission==1 ? this.errorMsgStudentTimePeriodManual=error : this.errorMsgStudentTimePeriodAuto=error);
              }

            }
        }else{
          this.errorMessage = "There is no any student for this course.";
        }
   
  }

  lessonTimeTable(transmission){
    this.timeTableService.getLessonsByPackageId(this.selectPackage.packageId,transmission).subscribe(
      response => {
        (transmission==1 ? this.manualLessonTimeTable=response : this.autoLessonTimeTable=response);
        this.timeTableService.getLessonTimeSlotByPackageId(this.selectPackage.packageId,transmission).subscribe(
          response => {
            (transmission==1 ? this.timeSlotIdManual=response : this.timeSlotIdAuto=response);
            console.log(this.timeSlotIdManual)
            console.log(this.manualLessonTimeTable);
            this.isManualTableActive=true;            
          },
          error => {
            console.log(error);
            this.handleErrorResponse(error); 
          }
        );
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }


 //error handling
 private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
    };

}
