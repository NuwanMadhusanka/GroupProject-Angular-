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
    this.filteredInstructors = this.filterStudent(value);
  }

  filterStudent(searchString:String){    // should change this code
     if(this.validation.isDigitContain(searchString)){
      return this.instructors.filter(instructor => 
        instructor.licence.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1) ;
     }
     return this.instructors.filter(instructor => 
        instructor.licence.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1) ;
        
  }
  //Finish filter option implementation

  constructor(
    private router:Router,
    private instructorService:InstructorServiceService
  ) { }

  ngOnInit() {
    this.instructorList();
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
/*
  //navigate to studentRegister Page
  addStudent(){
    this.router.navigate(['student-add'])
  }

  //delete Student
  deleteStudent(studentId,studentName){
    Swal.fire({
      title: 'Are you sure?',
      text: "Is delete "+studentName +"'s record?",//" student's details,payemnt details and all other relevant information.Can't revert the data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.studentService.studentDelete(studentId).subscribe(
          response => {
            this.studentList();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: studentName+'\'s record was deleted successful',
              showConfirmButton: false,
              timer: 3000
            });
          },
          error => {
            this.handleErrorResponse(0,error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: studentName+'\'s record was deleted not successful',
              showConfirmButton: false,
              timer: 3000
            });
          }
           
        );
      }
    })
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

  //navigate to more details page
  moreDetails(studentId){
    this.router.navigate(['student-more-details',studentId]);
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
