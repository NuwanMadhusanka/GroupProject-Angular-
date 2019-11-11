import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoServiceService } from '../../service/video/video-service.service';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../ClassModel/UserModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { VideoModel } from '../../ClassModel/VideoModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-video-more-details',
  templateUrl: './video-more-details.component.html',
  styleUrls: ['./video-more-details.component.scss']
})
export class VideoMoreDetailsComponent implements OnInit {
  videoId;
  userId;
  isUpdateVariable=false;
  selectOption;//updated variable Name(number)
  updateVariable;
  placeHolder;
  updateName;//update variable Name
  confirmUpdate=false;


  errorMessage;
  errorUpdateMessage="";
  httpError=new HttpError();

  userValidation=new UserValidation();
  user:UserModel=new UserModel(0,'','',new Date(),0,0,0);
  staff:StaffModel=new StaffModel(1,'q','q','q','q',this.user);
  adminStaff:AdminStaffModel=new AdminStaffModel(1,'q',1,this.staff);
  adminStaffId;
  systemDate;
   
videoData:VideoModel=new VideoModel(0,'q','q',this.adminStaff,new Date()); 

  constructor(
    private route:ActivatedRoute,
    private videoService:VideoServiceService,
    private adminStaffService:AdminStaffServiceService,
  ) { }

  ngOnInit() {
    this.videoId=this.route.snapshot.params['id'];//get video id by url
    console.log("In Video more detils ts");
    this.userId=sessionStorage.getItem("userId"); 
    this.VideoDetails();
  }

  setAdminStaffAndAdminStaffId(){
  this.adminStaffService.getAdminStaffFromUserID(this.userId).subscribe(
    response => {
        this.adminStaff=response;
        console.log("Setting adminstaff Id");
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

    //get Student Details from the API
  VideoDetails(){
    
    this.videoService.getVideo(this.videoId).subscribe(
      response => {
          console.log("In Video Details success");
          console.log(this.videoId);
          this.videoData=response;
          console.log(this.videoData);
      },
      error =>{
        console.log(error);
        console.log("In Videodetails error");
        this.handleErrorResponse(error);
      }
    )
  }

  isUpdate(option){ 
    this.errorUpdateMessage="";
    console.log(option);
    if( (option === 1)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Description";  this.updateName="Description"; this.updateVariable=this.videoData.description;}
    if( (option === 2)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New URL";  this.updateName="URL"; this.updateVariable=this.videoData.url;}
    //if( (option === 3)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Exam Date"; this.updateName="Exam Date"; this.updateVariable=this.studentData.examDate;}
    //if( (option === 4)){ this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Trial Date"; this.updateName="Trial Date"; this.updateVariable=this.studentData.trialDate;}
  }

  update(){
   
    this.setAdminStaffAndAdminStaffId();
    //description
    if(this.selectOption==1) {
      if( (this.updateVariable == "")){
          this.errorUpdateMessage="Insert Valid Desciption.";
      }else{
          this.videoData.description=this.updateVariable;
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
      }
    }

    //URL
    if(this.selectOption==2) {
      if( (this.updateVariable == "")){
          this.errorUpdateMessage="Insert Valid URL.";
      }else{
          this.videoData.url=this.updateVariable;
          this.videoData.adminStaffId=this.adminStaff;
          var datePipe = new DatePipe('en-US');
          this.systemDate = new Date(); 
          this.videoData.addedDate=this.systemDate;
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
      }
    }


    
    /*
    //URL
    if(this.selectOption==2){
     
      if( (this.updateVariable == "")){
        this.errorUpdateMessage="Insert Valid URL.";
      }else if( !(this.userValidation.isValidDate(this.updateVariable,this.studentData.trialDate))){
        this.errorUpdateMessage="Exam Date must be future Date & Exam should be held before Trial Date";
      }else{
        this.studentData.examDate=this.updateVariable;
        this.errorUpdateMessage="";
        this.isUpdateVariable=false;
        this.confirmUpdate=true;
      }
    }

    //Trial Date
    if(this.selectOption==4){
      if( (this.updateVariable == "")){
        this.errorUpdateMessage="Insert Valid Trial Date.";
      }else if(!(this.userValidation.isValidDate(this.studentData.examDate,this.updateVariable))){
        this.errorUpdateMessage="Trial Date must be future Date & Trial should be held after Exam Date"
      }else{
        this.studentData.trialDate=this.updateVariable;
        this.errorUpdateMessage="";
        this.isUpdateVariable=false;
        this.confirmUpdate=true;
      }
    }*/

  }


  close(){
    this.isUpdateVariable=false;
  }



  //save updates
  saveUpdate(){
    //Save Update data(API)
    this.videoService.updateVideo(this.videoData).subscribe(
      response => {
        console.log(response)
        Swal.fire('Update is Completed.')
        this.confirmUpdate=false;
        this.videoData=response;

      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Update is not Successful!',
          footer: 'Something bad happened, please try again later.'
        })
      }
       
    )
  }


  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage=this.httpError.ErrorResponse(error);
    console.log(this.errorMessage);
  };

  closeError(){
    this.errorMessage=null;
  }
}
