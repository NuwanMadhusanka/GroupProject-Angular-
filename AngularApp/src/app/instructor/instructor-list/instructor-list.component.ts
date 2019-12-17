import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { InstructorModel } from '../../ClassModel/InstructorModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';


@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit {

  errorMessage="";

  instructors:  InstructorModel[] = [];
  validation:UserValidation = new UserValidation();

  //Filter Option Implement
  filteredInstructors: InstructorModel[] = [];
  private _searchTerm:string;
  get searchTerm(): string{
    return this._searchTerm;
  }
  set searchTerm(value:string){
    this._searchTerm=value;
    this.filteredInstructors = this.filteredInstructord(value);
  }

  filteredInstructord(searchString:String){
    return this.instructors.filter(instructor =>
      instructor.instructorId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.firstName.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.lastName.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.nic.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.licence.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.email.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.tel.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );
   
  }
  //Finish filter option implementation

  constructor(
    private router:Router,
    private instructorService:InstructorServiceService
  ) { }

  ngOnInit() {
    this.instructorList();
  }

  //navigate to Instructor Register Page
  addInstructor() {
    this.router.navigate(['instructor-add'])
  }

  //get Instructor List
  instructorList(){
    this.instructorService.instructorList().subscribe(
      response => {
        this.instructors=response;
        this.filteredInstructors=this.instructors;
        console.log(response);
      },
      error => {
        this.handleErrorResponse(1,error);
      }
    );
  }

  //navigate to more details page
  moreDetails(instructorId){
    this.router.navigate(['instructor-more-details',instructorId]);
  }

  //deactivate Instructor
  deactivateInstructor(instructorId){
    Swal.fire({
      title: 'Are you sure?',
      text: "Deactivate instructor "+instructorId +"'s record?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.instructorService.instructorDeactivate(instructorId).subscribe(
          response => {
            this.instructorList();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Instructor ID :'+instructorId+'\'s profile deactivated Succesfully',
              showConfirmButton: false,
              timer: 3000
            });
          },
          error => {
            this.handleErrorResponse(0,error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title:'InstructorID '+instructorId+'\'s profile was not deleted not successfully',
              showConfirmButton: false,
              timer: 3000
            });
          }
           
        );
      }
    })
  }

/*
  //navigate to studentRegister Page
  addStudent(){
    this.router.navigate(['student-add'])
  }

  
  //navigate to student-package
  addPackage(studentId,studentName){
    console.log(studentId);
    this.router.navigate(['student-package-add',studentId,studentName]);
  }

  //navigate to student-payment 
  addPayment(studentId,studentName){
    this.router.navigate(['student-payment',studentId,studentName]);
  }

  

  studentPaymentCheck(){
    this.router.navigate(['student-payment-check']);
  }

  studentDeactivate(){
    this.router.navigate(['student-deactivate']);
  }

  /*
  1 -->  Initialize API Call
  0 --> Other API Call
  */
  handleErrorResponse(type,error){
    if(type==1){
      this.errorMessage="There is a problem with the service. please try again later.";
    }
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
   closeError(){
    this.errorMessage="";
  }

}
