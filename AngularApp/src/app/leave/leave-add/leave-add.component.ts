import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffServiceService} from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LeaveServiceService } from '../../service/leave/leave-service.service';
import { LeaveModel } from '../../ClassModel/LeaveModel';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-add',
  templateUrl: './leave-add.component.html',
  styleUrls: ['./leave-add.component.scss']
})
export class LeaveAddComponent implements OnInit {

 //form variables
 reason:String="";
 

 //form error messages variables
 errorReason;


 errorMessage:String;
 //regexp:any;//Regular Expression for NIC
 userId;
 staff; 
 staffId;
 date;
 

 constructor(
  private router:Router,
  private StaffService:StaffServiceService, 
  private LeaveService:LeaveServiceService
 ) { }

 ngOnInit() {
   console.log("In leave add comTs");
   this.userId=sessionStorage.getItem("userId"); 
   this.setStaffAndStaffId(); 
 }

setStaffAndStaffId(){ 
 this.StaffService.getStaffFromUserID(this.userId).subscribe(
   response => {
       this.staff=response;
       this.staffId=response.staffId;
       console.log("in sub");
       console.log(this.staffId);
       console.log("p0");
   },
   error =>{
     console.log(error);
     this.handleErrorResponse(error);
     
   }
 )
}



 //Save the Video
 addLeave(){
   
   console.log("In addleave method videoaddcomts");
   this.errorReason="";

   
   var datePipe = new DatePipe('en-US');
   this.date = new Date(); 



   //validate title  
   if(this.reason===""){
     this.errorReason="Reason is mandatory";
   }

   //Save to the DB
   if(this.errorMessage==null){  
     console.log("1 videoaddcomts");  
     //work with backend service
         //Save Video relevant Data
                                                           
         this.LeaveService.saveLeave(new LeaveModel(-1,this.reason,this.date,this.staff)).subscribe(
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