import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../../service/student/student-service.service';
import { StudentModel } from '../../ClassModel/StudentModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  errorMessage="";

  students: StudentModel[] = [];

  constructor(
    private router:Router,
    private studentService:StudentServiceService
  ) { }

  ngOnInit() {
    this.studentList();
  }

  //navigate to studentRegister Page
  addStudent(){
      this.router.navigate(['student-add'])
  }

  //get Student List
  studentList(){
    this.studentService.studentList().subscribe(
      response => {
        this.students=response;
        // console.log(this.students);
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }

  //delete Student
  deleteStudent(studentId:Number){
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete student Details,Payemnt Details and all other relevant information.Can't revert the Data!",
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
            Swal.fire(
              'Deleted!',
              'Student Record has been deleted.',
              'success'
            )
          },
          error => {
            console.log(error);
            this.handleErrorResponse(error);
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Delete Is Not Successful!',
              footer: 'Something bad happened, please try again later.'
            })
          }
           
        )
      }
    })
  }

  //navigate to student-package
  addPackage(studentId:Number){
    console.log(studentId);
    this.router.navigate(['student-package-add',studentId])
  }

  //navigate to student-payment 
  addPayment(studentId){
    this.router.navigate(['student-payment',studentId])
  }

  //navigate to more details page
  moreDetails(studentId){
    this.router.navigate(['student-more-details',studentId]);
  }

  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
