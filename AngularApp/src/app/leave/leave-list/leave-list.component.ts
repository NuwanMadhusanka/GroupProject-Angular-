import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveServiceService } from '../../service/leave/leave-service.service';
import { LeaveModel } from '../../ClassModel/LeaveModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { leave } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit {
  errorMessage="";

  leaves: LeaveModel[] = [];

  validation: UserValidation = new UserValidation();

    //Filter Option Implement
  filteredLeaves: LeaveModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredLeaves = this.filterLeave(value);
  }

  //Filtering method
  filterLeave(searchString: string) {

    return this.leaves.filter(leave   =>
      leave.leaveid.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      leave.reason.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
   
     
      leave.date.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      leave.staffId.staffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 
    );
  }
  

  constructor(
    private router:Router,
    private leaveService:LeaveServiceService
  ) { }

  ngOnInit() {
    console.log("In Video List in videoListCom TS");
    this.LeaveList();
  }

  //get Student List
  LeaveList(){
    this.leaveService.LeaveList().subscribe(
      response => {
        this.leaves=response;
        this.filteredLeaves=this.leaves;
        console.log(response);
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
   //navigate to studentRegister Page
  addLeave(){
      this.router.navigate(['leave-add']) 
  }

  //navigate to more details page


  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

//delete Video
  deleteLeave(leaveId:Number){
    console.log("In vode del ts");
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
        this.leaveService.deleteLeave(leaveId).subscribe(
          response => {
            this.LeaveList(); 
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


/*
 

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
  
  //navigate to student-package
  addPackage(studentId:Number){
    console.log(studentId);
    this.router.navigate(['student-package-add',studentId])
  }

  //navigate to student-payment 
  addPayment(studentId){
    this.router.navigate(['student-payment',studentId])
  }

  

  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
*/
}
