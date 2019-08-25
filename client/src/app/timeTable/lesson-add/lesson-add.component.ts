import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTableServiceService } from '../../service/TimeTable/time-table-service.service';
import { TimeSlotModel } from '../../ClassModel/TimeSlotModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { PackageServiceService } from '../../service/package/package-service.service';
import { PackageModel } from '../../ClassModel/PackageModel';



@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.scss']
})
export class LessonAddComponent implements OnInit {

  timeSlotListData:TimeSlotModel[]=[];
  packageListData:PackageModel[]=[];
  dayListData:any[] = [
    {id:1 ,name:'Monday'},
    {id:2 ,name:'Tuesday'},
    {id:3 ,name:'Wednesday'},
    {id:4 ,name:'Thursday'},
    {id:5 ,name:'Friday'},
    {id:6 ,name:'Saturday'},
    {id:0 ,name:'Sunday'}
  ];

  errorMessage;

  //form Variable
  selectDay;
  selectTimeSlot:TimeSlotModel;
  selectPackage:PackageModel;
  selectTransmission=1;

  isTransmissionSelect;
  isdisableInstructor=true;
  
  constructor(
    private router:Router,
    private timeTableService:TimeTableServiceService,
    private packageService:PackageServiceService
  ) { }

  ngOnInit() {
    this.timeSlotList();
    this.packageList();
  }

  //get time Slot Details
  timeSlotList(){
      this.timeTableService.getTimeSlotList().subscribe(
        response => {
            this.timeSlotListData=response;
        },
        error => {
            console.log(error);
            this.handleErrorResponse(error);
        }
      );
  }

  //get package Details
  packageList(){
    this.packageService.packageList().subscribe(
      response => {
          this.packageListData=response;
      },
      error => {
          console.log(error);
          this.handleErrorResponse(error);
      }
    );
  }

  //Save the lesson data
  save(){
    console.log("timeSlot:"+this.selectTimeSlot);
    console.log("day:"+this.selectDay);
    console.log("package"+this.selectPackage);
    console.log("transmission"+this.selectTransmission);
  }

 //error handling
 private handleErrorResponse(error: HttpErrorResponse) {
  let httpError = new HttpError();
  this.errorMessage=httpError.ErrorResponse(error);
  console.log(this.errorMessage);
};


  //button
  timeSlot(){
    this.router.navigate(['time-slot']);
  }

  showTransmission(pac:PackageModel){
    this.isTransmissionSelect=false;
    if( (pac.manualLes >0) && (pac.autoLes>0)){
        this.isTransmissionSelect=true;
    }
    this.showInstructor();
  }

  selectOption(option){
      if(option===1) {this.selectTransmission=1;}
      else {this.selectTransmission=2;}
      this.showInstructor();
  }

  showInstructor(){
    if( this.selectDay!=null && this.selectPackage!=null && this.selectTimeSlot!=null){
        let transmission=0;

        //find selection transmission
        if(this.selectPackage.autoLes>0 && this.selectPackage.manualLes>0){
          (this.selectTransmission === 1)? transmission=1 : transmission=2;
        }else if(this.selectPackage.manualLes>0){
          transmission=1
        }else if(this.selectPackage.autoLes>0){
          transmission=2;
        }

      
        //get Instructor List
        this.timeTableService.getRelevantInstructorsList(this.selectDay,this.selectPackage.packageId,this.selectTimeSlot.timeSlotId,transmission).subscribe(
          response => {

          },
          error => {

          }
        )
    }
  }

}
