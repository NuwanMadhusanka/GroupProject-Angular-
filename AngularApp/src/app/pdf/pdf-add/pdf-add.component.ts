import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService} from '../../service/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PdfServiceService } from '../../service/learning-material/pdf/pdf-service.service';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { UserModel } from '../../ClassModel/UserModel';
import { PdfModel } from '../../ClassModel/PdfModel';
import { HttpError } from '../../Shared/httpError/HttpError';
//import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
selector: 'app-pdf-add',
templateUrl: './pdf-add.component.html',
styleUrls: ['./pdf-add.component.scss']
})
export class PdfAddComponent implements OnInit {

//form variables
pdfId:Number=-1;
description:String="";
resource:String="";
title:String="";
adminStaff;
adminStaffId:Number=-1;   
addedDate:Date=null;
systemDate:Date=null;
//addedDate:Date=formatDate(new Date(), 'yyyy/MM/dd', 'en');
userId;


//form error messages variables
errorPdfId;
errorDescription;
errorResource;
errorTags;
errorAdminStaffId;
errorAddedDate;


errorMessage:String;
regexp:any;//Regular Expression for NIC
test:boolean;//Regular exprssion result

//idate:Date;

//user Validation Instance
//userValidation = new UserValidation();

constructor(
  private router:Router,
  private adminStaffService:AdminStaffServiceService,
  private pdfService:PdfServiceService,

  //private studentService:StudentServiceService
) { }

ngOnInit() {
  console.log("In pdfadd new Compo ts OnIt");
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

addPdf(){
  console.log("In pdfadd method in addnewPdfTs with submit");
  var datePipe = new DatePipe('en-US');
  this.addedDate = new Date();
  this.errorPdfId="";
  this.errorResource="";
  this.errorDescription="";
  this.errorTags="";
  this.errorAdminStaffId="";
  this.errorAddedDate="";
  
  //validate id
  if(this.pdfId===-1){
    this.errorPdfId="PDFId is mandatory";
  }

  //validate resource
  if(this.resource===""){
    this.errorResource="Resource  is mandatory ";
  }//else if( !this.userValidation.isValidNicNumber(this.nic) ){
  //  this.errorNic="Enter Valid NIC Number";
  // }

  //Valid description
  if(this.description===""){
    this.errorDescription="Description number is mandatory";
  }//else if( !this.userValidation.isValidTelNumber(this.tel) ){
    // this.errorDescription="Enter Valid Telephone Number ";
  //}


  //valid added date
  if( this.addedDate === null ){
    this.errorAddedDate="Error in getting system Date "; // error message bit changed
  }//else if( !this.userValidation.isValidEmail(this.email) ){
    // this.errorEmail="Enter Valid Email Address";
  // }

  //password
  if( this.adminStaffId === -1){
    this.errorAdminStaffId="Error getting Admin Staff Details";  // should take admin staff id from log in user details
  }  


  //valid Trial Date
  // if(!this.isDateFuture(this.trialDate)){
  //   this.errorMessage+="Enter Valid Trial Date(future) / "
  // }else if(this.examDate>this.trialDate){
  //   this.errorMessage+="Enter Correct Exam date and Trial date / "
  // }


  //Save to the DB
  if(this.errorMessage==null){
    console.log(this.errorMessage);
    this.pdfService.addPdf(new PdfModel(-1,this.resource,this.description,this.title,this.adminStaff,this.addedDate)).subscribe(
          response => {
            console.log(response);
            Swal.fire({
                  position: 'top-end',
                  type: 'success',
                  title: 'Pdf Successfuly saved.',
                  showConfirmButton: false,
                  timer: 2000
                });
            this.router.navigate(['pdf-list'])},
          error => {
            
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
