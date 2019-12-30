import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplainServiceService } from '../../service/complain/complain-service.service';
import { ComplainModel } from '../../ClassModel/ComplainModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.scss']
})
export class ComplainListComponent implements OnInit {

  errorMessage="";

  complains: ComplainModel[] = [];

  validation: UserValidation = new UserValidation();

    //Filter Option Implement
  filteredComplains: ComplainModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredComplains = this.filterComplain(value);
  }

  //Filtering method
  filterComplain(searchString: string) {

    return this.complains.filter(complain =>
      complain.complainId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      complain.title.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      complain.complain.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      complain.staffId.staffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      complain.view.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      complain.date.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      complain.reply.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 
      

    );
  }
  

  constructor(
    private router:Router,
    private complainService:ComplainServiceService
  ) { }

  ngOnInit() {
    console.log("In Complain List in complainListCom TS");
    this.complainList();
  }

  //get Student List
  complainList(){
    this.complainService.complainList().subscribe(
      response => {
        this.complains=response;
        this.filteredComplains=this.complains;
        console.log(response);
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
   //navigate to studentRegister Page
   addComplain(){
      this.router.navigate(['complain-add']) 
  }

  //navigate to more details page
 /* / moreDetails(complainId){
    this.router.navigate(['video-more-details',videoId]);
  }*/

  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

//delete Video
  deleteComplain(complainId){
    console.log("In vode del ts");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Complain Details",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.complainService.deleteComplain(complainId).subscribe(
          response => {
            this.complainList(); 
            Swal.fire(
              'Deleted!',
              'Complain has been deleted.',
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
