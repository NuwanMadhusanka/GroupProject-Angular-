import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService} from '../../service/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { StudentServiceService } from '../../service/student/student-service.service';
import { UserModel } from '../../ClassModel/UserModel';
import { StudentModel } from '../../ClassModel/StudentModel';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  name:String="";
  nic:String="";
  tel:String="";
  address:String="";
  email:String="";
  password:String="";
  examDate:Date;
  trialDate:Date;

  errorMessage:String;
  regexp:any;//Regular Expression for NIC
  test:boolean;//Regular exprssion result

  //idate:Date;
  

  constructor(
   private router:Router,
   private userService:UserServiceService,
   private studentService:StudentServiceService
  ) { }

  ngOnInit() {
    
  }

  //Student Registration Funtion
  registerStudent(){
    
    this.errorMessage="";

    //validate name
    if(this.name===""){
      this.errorMessage="Name is mandatory / ";
    }

    //validate NIC
    if(this.nic===""){
      this.errorMessage+="NIC number is mandatory / ";
    }else if( (this.isPatternNic()) ){
      this.errorMessage+="Enter Valid NIC Number / ";
    }

    //Valid Number
    if(this.tel===""){
      this.errorMessage+="Telephone number is mandatory / ";
    }else if( (this.isTel()) ){
      this.errorMessage+="Enter Valid Telephone Number / ";
    }

    //valid address
    if( this.address=="" || this.address==null ){
      this.errorMessage+="Address is mandatory / ";
    }

    //valid email
    if( this.email=="" || this.email==null ){
      this.errorMessage+="Email is mandatory / ";
    }
    // else if(){
    //   this.errorMessage+="Enter Valid Email Address / ";
    // }

    //password
    if( this.password=="" || this.password==null ){
      this.errorMessage+="Password is mandatory / ";
    }  

    //valid Exam Date
    // if(!this.isDateFuture(this.examDate)){
    //   this.errorMessage+="Enter Valid Exam Date(future) / "
    // }

    //valid Trial Date
    // if(!this.isDateFuture(this.trialDate)){
    //   this.errorMessage+="Enter Valid Trial Date(future) / "
    // }else if(this.examDate>this.trialDate){
    //   this.errorMessage+="Enter Correct Exam date and Trial date / "
    // }


    //Save to the DB
    if(this.errorMessage==""){
    
      //work with backend service

      //1)Save User relevant Data
      this.userService.userRegister(new UserModel(-1,this.email,this.password,new Date(),1,5)).subscribe(
        response => {
          var userId=response.userId
          console.log(userId);

          //Save Student relevant Data
          this.studentService.studentRegister(new StudentModel(-1,this.name,this.tel,this.nic,this.examDate,this.trialDate,this.address,response)).subscribe(
            response => {
              console.log(response);
              this.router.navigate(['student-list'])},
            error => {
              //If it's error should delete user record from the db
              this.userService.userDelete(userId).subscribe(
                response => {console.log("user delete success")},
                error => {console.log("User delete not success")}

              )
              console.log(error);
              this.handleErrorResponse(error);
            }
          )

        },
        error => this.handleErrorResponse(error)
      )
      
    }

  }

  
  // handleSuccessfulResponse(response){
  //   //2)Save the student date    
  //   console.log("response")
  //   console.log(response.Data);
  // }

  // handleErrorResponse(error){
  //   console.log("error")
  //   console.log(error);
  // }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage="Not Successful Registration";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  //Validation Functions
  isPatternNic(){
    if(this.nic.length == 10){
      this.regexp = new RegExp('\\d{9,9}[v,V]');
      this.test = this.regexp.test(this.nic);
      if(this.test){
        return false;
      }else{
        return true;
      }
    }
    return true;
  }

  isTel(){
    if(this.tel.length == 10){
      this.regexp = new RegExp('\\d{10,10}');
      this.test = this.regexp.test(this.tel);
      if(this.test){
        return false;
      }else{
        return true;
      }
      
    }
    return true;
  }

  closeError(){
    this.errorMessage="";
  }

}
