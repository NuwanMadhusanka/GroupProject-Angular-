import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedBackServiceService } from '../../service/feedback/feedback-service.service';
import { FeedBackModel } from '../../ClassModel/FeedBackModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  errorMessage="";

  feedbacks: FeedBackModel[] = [];

  validation: UserValidation = new UserValidation();

    //Filter Option Implement
  filteredFeedBacks: FeedBackModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredFeedBacks = this.filterFeedBack(value);
  }

  //Filtering method
  filterFeedBack(searchString: string) {

    return this.feedbacks.filter(feedback =>
      feedback.feedbackid.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      feedback.feedback.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||

      feedback.studentId.studentId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );
  }
  

  constructor(
    private router:Router,
    private feedbackService:FeedBackServiceService
  ) { }

  ngOnInit() {
    console.log("In Video List in videoListCom TS");
    this.feedbackList();
  }

  //get Student List
  feedbackList(){
    this.feedbackService.FeedBackList().subscribe(
      response => {
        this.feedbacks=response;
        this.filteredFeedBacks=this.feedbacks;
        console.log(response);
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
   //navigate to studentRegister Page
  addFeedback(){
      this.router.navigate(['feedback-add']) 
  }


  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

//delete Video
  deleteFeedback(feedbackid:Number){
    console.log("In vode del ts");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete FeedBack!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.feedbackService.deleteFeedBack(feedbackid).subscribe(
          response => {
            this.feedbackList(); 
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
