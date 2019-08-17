import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService,UserBean } from '../../service/user/user-service.service';



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

  user:UserBean;//user Object

  constructor(
   private router:Router,
   private userService:UserServiceService
  ) { }

  ngOnInit() {
  }

  registerStudent(){
    
    this.errorMessage="";

    //validate name
    if(this.name===""){
      this.errorMessage="Name is mandatory / "
    }

    //validate NIC
    if(this.nic===""){
      this.errorMessage+="NIC number is mandatory / ";
    }else if( this.nic.length != 10 || (this.isPatternNic())){
      this.errorMessage+="Enter Valid NIC Number / "
    }

    //Valid Number
    if(this.tel=="" || this.tel==null){
      this.errorMessage+="Telephone number is mandatory / ";
    }else if(  this.tel.length!=10 || (this.isTel()) ){
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

    if(this.errorMessage==""){
      console.log(this.email)
      //create user object
      this.user.email=this.email;
      this.user.password=this.password;
      this.user.regDate=new Date();
      this.user.role=5;
      this.user.status=1

      //work with backend service
      this.userService.userRegister(this.user).subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      )
    }

  }

  handleSuccessfulResponse(response){
    console.log(response);
  }

  handleErrorResponse(error){
    console.log(error);
  }

  isPatternNic(){
    this.regexp = new RegExp('\d{9,9}[v,V]');
    this.test = this.regexp.test(this.nic);
    if(this.test){
      return false;
    }
    return false;
  }

  isTel(){
    this.regexp = new RegExp('\d{10,10}');
    this.test = this.regexp.test(this.tel);
    if(this.test){
      return false;
    }
    return false;
  }

  closeError(){
    this.errorMessage="";
  }

}
