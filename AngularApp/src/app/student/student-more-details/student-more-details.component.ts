import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../ClassModel/StudentModel';
import { ActivatedRoute } from '@angular/router';
import { StudentServiceService } from '../../service/student/student-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../ClassModel/UserModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';



@Component({
  selector: 'app-student-more-details',
  templateUrl: './student-more-details.component.html',
  styleUrls: ['./student-more-details.component.scss']
})
export class StudentMoreDetailsComponent implements OnInit {
  studentId;
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

  studentData:StudentModel=new StudentModel(1,'Nuwan','0773015590','980150429v',new Date(),new Date(),'No 20 Homagama',new UserModel(1,'nuwan@gmail.com','1234',new Date(),1,1));

  constructor(
    private route:ActivatedRoute,
    private studentService:StudentServiceService,
  ) { }

  ngOnInit() {
    this.studentId=this.route.snapshot.params['id'];//get student id by url
    this.studentDetails();
  }

  isUpdate(option){
    this.errorUpdateMessage="";
    
    if( (option === 1)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Email";  this.updateName="Email"; this.updateVariable=this.studentData.userId.email;}
    if( (option === 2)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Password";  this.updateName="Password"; this.updateVariable=this.studentData.userId.password;}
    if( (option === 3)){  this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Exam Date"; this.updateName="Exam Date"; this.updateVariable=this.studentData.examDate;}
    if( (option === 4)){ this.isUpdateVariable=true;  this.selectOption=option;  this.placeHolder="New Trial Date"; this.updateName="Trial Date"; this.updateVariable=this.studentData.trialDate;}
  }

  update(){
    
    //email 
    if(this.selectOption==1) {
      if( (this.updateVariable == "") || !this.userValidation.isValidEmail(this.updateVariable)){
          this.errorUpdateMessage="Insert Valid Email Address.";
      }else{
          this.studentData.userId.email=this.updateVariable;
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
      }
    }

    //password
    if(this.selectOption==2) {
      if( (this.updateVariable == "")){
          this.errorUpdateMessage="Insert Valid Password.";
      }else{
          this.studentData.userId.password=this.updateVariable;
          this.errorUpdateMessage="";
          this.isUpdateVariable=false;
          this.confirmUpdate=true;
      }
    }

    //Exam Date
    if(this.selectOption==3){
     
      if( (this.updateVariable == "")){
        this.errorUpdateMessage="Insert Valid Exam Date.";
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
    }


   
  }


  close(){
    this.isUpdateVariable=false;
  }

  //get Student Details from the API
  studentDetails(){
    
    this.studentService.studentGet(this.studentId).subscribe(
      response => {
          this.studentData=response;
          console.log(this.studentData)
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  //save updates
  saveUpdate(){
    //Save Update data(API)
    this.studentService.studentUpdate(this.studentData).subscribe(
      response => {
        console.log(response)
        Swal.fire('Update is Completed.')
        this.confirmUpdate=false;
        this.studentData=response;

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
