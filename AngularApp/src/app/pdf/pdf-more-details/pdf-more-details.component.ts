import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../ClassModel/StudentModel';
import { ActivatedRoute } from '@angular/router';
import { PdfServiceService } from '../../service/learning-material/pdf/pdf-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PdfModel } from '../../ClassModel/PdfModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { UserModel } from '../../ClassModel/UserModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
//import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pdf-more-details',
  templateUrl: './pdf-more-details.component.html',
  styleUrls: ['./pdf-more-details.component.scss']
})
export class PdfMoreDetailsComponent implements OnInit {
  pdfId;
  isUpdateVariable=false;
  selectOption;//updated variable Name(number)
  updateVariable;
  placeHolder;
  updateName;//update variable Name
  confirmUpdate=false;
 // adminStaff;
  adminStaffId;
  userId;
  systemDate;

  errorMessage;
  errorUpdateMessage="";
  httpError=new HttpError();

  userValidation=new UserValidation();
  user:UserModel=new UserModel(0,'','','','','','','',new Date(),0,0,0);
  staff:StaffModel=new StaffModel(1,this.user);
  adminStaff:AdminStaffModel=new AdminStaffModel(1,'q',1,this.staff);
  pdfData:PdfModel=new PdfModel(0,'q','q','q',this.adminStaff,new Date());
  //pdfData:PdfModel=new PdfModel(1,'','','',new AdminStaffModel());
  //studentData:StudentModel=new StudentModel(1,'Nuwan','0773015590','980150429v',new Date(),new Date(),'No 20 Homagama',new UserModel(1,'nuwan@gmail.com','1234',new Date(),1,1));
  pdfSrc: string = '/pdf-test.pdf';
 constructor(
   
    private route:ActivatedRoute,
    private pdfService:PdfServiceService,
    private adminStaffService:AdminStaffServiceService,

  ) { }

  ngOnInit() {
    console.log("in pdfMOREcomTS ngOnIt");
    this.pdfId=this.route.snapshot.params['id'];//get pdf id by url
    this.pdfDetails();
    this.userId=sessionStorage.getItem("userId");
    //this.setAdminStaffAndAdminStaffId();
  }

    //get Pdf Details from the API
  pdfDetails(){
        console.log("in pdfMOREcomTS1");
    this.pdfService.getPdfbyID(this.pdfId).subscribe(
      response => {
          this.pdfData=response;
              console.log("in pdflistMoRETS2");
          console.log(this.pdfData);
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

  }

  isUpdate(option){
    console.log(this.pdfData);
    this.errorUpdateMessage="";
    console.log(option);    //sjould implement them 
    if( (option === 1)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Description";  this.updateName="Description"; this.updateVariable=this.pdfData.description;}
    if( (option === 2)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Resource";  this.updateName="Resource"; this.updateVariable=this.pdfData.resource;}
    if( (option === 3)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Title"; this.updateName="Title"; this.updateVariable=this.pdfData.title;}
    
  }

  update(){
    this.setAdminStaffAndAdminStaffId();
    //description 
    
    if(this.selectOption==1) {
      console.log("inUpdate in description");
      if(this.updateVariable == ""){
          this.errorUpdateMessage="You must insert Description";
      }else{
          this.pdfData.description=this.updateVariable;
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
          console.log("inUpdate in description data set");
      }
    }

    //resource
    if(this.selectOption==2) {
      if( (this.updateVariable == "")){
          this.errorUpdateMessage="You must insert Resource.";
      }else{
          this.pdfData.resource=this.updateVariable;
          this.pdfData.adminStaffId=this.adminStaff;
          var datePipe = new DatePipe('en-US');
          this.systemDate = new Date();
          this.pdfData.addedDate=this.systemDate;
          console.log(this.pdfData.adminStaffId);
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
      }
    }

    //title
    if(this.selectOption==3) {
    
          this.pdfData.title=this.updateVariable;
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
      
    }
  
  }



  close(){
    this.isUpdateVariable=false;
  }

  //save updates
  saveUpdate(){
   
    //Save Update data(API)
    this.pdfService.updatePdf(this.pdfData).subscribe(

      response => {
         console.log("In saving Update");
        console.log(response);
        
        Swal.fire('Update is Completed.');
        this.confirmUpdate=false;
        this.pdfData=response;

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


  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage=this.httpError.ErrorResponse(error);
    console.log(this.errorMessage);
  };

  closeError(){
    this.errorMessage=null;
  }
}
