import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService} from '../../service/student/student-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedBackServiceService } from '../../service/feedback/feedback-service.service';
import { FeedBackModel } from '../../ClassModel/FeedBackModel';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.scss']
})
export class FeedbackAddComponent implements OnInit {

  //form variables
  feedback:String="";


  //form error messages variables
  errorFeedBack;
  

  errorMessage:String;
  //regexp:any;//Regular Expression for NIC
  userId;
  student; 
  studentId;
 
  

  constructor(
   private router:Router,
   private studentService:StudentServiceService, 
   private feedbackService:FeedBackServiceService
  ) { }

  ngOnInit() {
    console.log("In video add comTs");
    this.userId=sessionStorage.getItem("userId"); 
    this.setStudnetAndStudnetId(); 
  }

  setStudnetAndStudnetId(){ 
  this.studentService. getStudentID(this.userId).subscribe(
    response => {
        this.student=response;
        this.studentId=response.studentId;
        console.log("in sub");
        console.log(this.studentId);
        console.log("p0");
    },
    error =>{
      console.log(error);
      this.handleErrorResponse(error);
      
    }
  )
}



  //Save the Video
  addFeedback(){
    
    console.log("In addvideo method videoaddcomts");
    this.errorFeedBack="";
    
    
    


    //validate title  
    if(this.feedback===""){
      this.errorFeedBack="Title is mandatory";
    }

  
    
    //Save to the DB
    if(this.errorMessage==null){  
      console.log("1 videoaddcomts");  
      //work with backend service
          //Save Video relevant Data
                                                            
          this.feedbackService.saveFeedBack(new FeedBackModel(-1,this.feedback,this.student)).subscribe(
            response => {
              console.log(response);
              this.router.navigate(['feedback-list'])}, 
            error => {
              //If some error occurs it is handled using handleErrorResponse method
              console.log(error);
              this.handleErrorResponse(error);
            }
          ) 
      
    }

  }


  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage="There is a problem with the service. please try again later."; 
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  };

}