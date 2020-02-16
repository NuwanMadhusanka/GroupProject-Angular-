import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentServiceService } from '../../service/student/student-service.service';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { InstructorServiceService } from '../../service/Instructor/instructor-service.service';
import { UserModel } from '../../ClassModel/UserModel';
import { InstructorModel } from '../../ClassModel/InstructorModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.scss']
})
export class InstructorAddComponent implements OnInit {

  //form variables
  firstName: String = "";
  lastName: String = "";
  nic: String = "";
  tel: String = "";
  address: String = "";
  licence: String = "";
  email: String = "";
  password: String = "";

  //form error messages variables
  errorFirstName;
  errorLastName;
  errorNIC;
  errorTel;
  errorAddress;
  errorLicence;
  errorEmail;
  errorPassword;
  date;

  errorMessage: String;
  regexp: any;//Regular Expression for NIC
  test: boolean;//Regular exprssion result
  //idate:Date;

  //user Validation Instance
  userValidation = new UserValidation();

  user: UserModel;
  staff: StaffModel = new StaffModel(1, this.user);
  instructor: any;

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private staffService: StaffServiceService,
    private instructorService: InstructorServiceService,
    private studentService: StudentServiceService
  ) { }

  ngOnInit() {

  }

  //Student Registration Funtion
  registerInstructor() {

    this.errorFirstName = "";
    this.errorLastName = "";
    this.errorNIC = "";
    this.errorTel = "";
    this.errorEmail = "";
    this.errorPassword = "";
    this.errorLicence = "";
    this.errorAddress = "";

    //validate name
    if (this.firstName === "") {
      this.errorFirstName = "First Name is mandatory";
    }
    if (this.lastName === "") {
      this.errorLastName = "Last Name is mandatory";
    }

    //validate NIC
    if (this.nic === "") {
      this.errorNIC = "NIC number is mandatory ";
    } else if (!this.userValidation.isValidNicNumber(this.nic)) {
      this.errorNIC = "Enter Valid NIC Number";
    }

    //Valid Number
    if (this.tel === "") {
      this.errorTel = "Telephone number is mandatory";
    } else if (!this.userValidation.isValidTelNumber(this.tel)) {
      this.errorTel = "Enter Valid Telephone Number ";
    }

    //valid address
    if (this.address === "") {
      this.errorAddress = "Address is mandatory ";
    }

    //valid email
    if (this.email === "") {
      this.errorEmail = "Email is mandatory ";
    } else if (!this.userValidation.isValidEmail(this.email)) {
      this.errorEmail = "Enter Valid Email Address";
    }

    //password
    if (this.password === "") {
      this.errorPassword = "Password is mandatory";
    }

    //licence
    if (this.licence === "") {
      this.errorLicence = "Licence is mandatory";
    }

    //Save to the DB
    if (this.errorFirstName == "" && this.errorLastName == "" && this.errorNIC == "" && this.errorTel == "" && this.errorAddress == "" && this.errorEmail == "" && this.errorPassword == "" && this.errorLicence == "") {
      console.log("ok");
      var datePipe = new DatePipe('en-US');
      this.date = new Date();
      this.user = new UserModel(-1, this.firstName, this.lastName, this.tel, this.nic, this.address, this.email, this.password, this.date, 1, 4, 0);
      this.staff = new StaffModel(-1, this.user);

      //Save Instructor relevant Data
      this.instructorService.instructorRegister(new InstructorModel(-1, this.licence, this.staff)).subscribe(
        response => {

          if (response == 1) {

            //register success
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Registration Successful.',
              showConfirmButton: false,
              timer: 2000
            });
             console.log(this.email);
             this.instructorService.getInstructorbyEmail(this.email).subscribe(
              response=>{
                this.instructor=response;
                console.log(this.instructor.instructorId);
                this.router.navigate(['instructor-more-details', this.instructor.instructorId]);

              }
             ) ;        
             
          } else {    //Instructor not registered 

            if (response == 2) {    // error in saving staff relavant data
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Instructor Registration Not Successful!.',
                footer: 'Error in saving Staff Relavant data'
              })
            }

            if (response == 3) {    // error in saving instructor relavant data
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Instructor Registration Not Successful!.',
                footer: 'Error in saving Instructor Relavant data'
              })
            }
            if (response == 0) {    // error registering instructor
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Instructor Registration Not Successful!.',
                footer: ''
              })
            }
          }
        })
    }
  }


  closeError() {
    this.errorMessage = "";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = "There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  };

}
