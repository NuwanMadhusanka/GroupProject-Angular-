import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminStaffServiceService} from '../../service/adminStaff/admin-staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoServiceService } from '../../service/video/video-service.service';
import { VideoModel } from '../../ClassModel/VideoModel';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.scss']
})
export class VideoAddComponent implements OnInit {

  //form variables
  title:String="";
  description:String="";
  url:String="";

  //form error messages variables
  errorTitle;
  errorDescription;
  errorUrl;

  errorMessage:String;
  //regexp:any;//Regular Expression for NIC
  userId;
  adminStaff; 
  adminStaffId;
  addedDate;
  

  constructor(
   private router:Router,
   private adminStaffService:AdminStaffServiceService, 
   private videoService:VideoServiceService
  ) { }

  ngOnInit() {
    console.log("In video add comTs");
    this.userId=sessionStorage.getItem("userId"); 
    this.setAdminStaffAndAdminStaffId(); 
  }

setAdminStaffAndAdminStaffId(){ 
  this.adminStaffService.getAdminStaffFromUserID(this.userId).subscribe(
    response => {
        this.adminStaff=response;
        this.adminStaffId=response.adminStaffId;
        console.log("in sub");
        console.log(this.adminStaffId);
        console.log("p0");
    },
    error =>{
      console.log(error);
      this.handleErrorResponse(error);
      
    }
  )
}



  //Save the Video
  addVideo(){
    
    console.log("In addvideo method videoaddcomts");
    this.errorDescription="";
    this.errorUrl="";
    
    var datePipe = new DatePipe('en-US');
    this.addedDate = new Date(); 



    //validate title  
    if(this.title===""){
      this.errorTitle="Title is mandatory";
    }

    //validate url 
    if(this.url===""){
      this.errorUrl="URL is mandatory ";
    }
    
    //Save to the DB
    if(this.errorMessage==null){  
      console.log("1 videoaddcomts");  
      //work with backend service
          //Save Video relevant Data
                                                            
          this.videoService.saveVideo(new VideoModel(-1,this.title,this.url,this.description,this.adminStaff,this.addedDate)).subscribe(
            response => {
              console.log(response);
              this.router.navigate(['video-list'])}, 
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