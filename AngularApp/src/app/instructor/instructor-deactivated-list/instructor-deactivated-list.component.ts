import { Component, OnInit } from '@angular/core';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { InstructorModel } from '../../ClassModel/InstructorModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';

@Component({
  selector: 'app-instructor-deactivated-list',
  templateUrl: './instructor-deactivated-list.component.html',
  styleUrls: ['./instructor-deactivated-list.component.scss']
})
export class InstructorDeactivatedListComponent implements OnInit {

  deactivatedInstructors:InstructorModel[];

  validation:UserValidation = new UserValidation();

  constructor(
    private instructorService:InstructorServiceService,
    private router:Router
  ) { }

   //Filter Option Implement
   filteredDeactivatedInstructors: InstructorModel[] = [];
   private _searchTerm:string;
   get searchTerm(): string{
     return this._searchTerm;
   }
   set searchTerm(value:string){
     this._searchTerm=value;
     this.filteredDeactivatedInstructors = this.filterInstructors(value);
   }
 
   filterInstructors(searchString:string){
     return this.deactivatedInstructors.filter(instructor =>
      instructor.staffId.userId.firstName.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.lastName.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      instructor.staffId.userId.nic.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 
    );
  }
   //Finish filter option implementation

  ngOnInit() {
    this.deactivatedInstructorList();
  }
  
  deactivatedInstructorList(){
    this.instructorService.instructorList(0).subscribe(
      response => {
        this.deactivatedInstructors=response;
        this.filteredDeactivatedInstructors=this.deactivatedInstructors;
      },
      error => {
        this.handleErrorResponse(error);
      }
    );
  }

  acivateInstructorAccount(instructorId,instructorName){
    console.log("list com ts active Ins");
     this.instructorService.activateInstructorAccount(instructorId).subscribe(
       response => {
        if(response==1){     // account activated
          console.log(response)
          Swal.fire({
            position: 'center',
            type: 'success',
            title: instructorName+'\'s account activated.',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['instructor-list']);
        }else{   //error in account activation
          Swal.fire({
            title: 'Error!!',
            html: "Problem in activating account. ",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
         /* .then((result) => {
            if (result.value) {
             
            }
          });
          */
        }
       },
       error => {
         console.log(error);
         this.handleErrorResponse(error);
       }
     );
  }

  checkSalaryPayments(instructorId){
     this.instructorService.checkSalaryPayments(instructorId).subscribe(
      response => {
       console.log("Paid");
      },
      error => {
        this.handleErrorResponse(error);
      }
    );
  }
/*
  

    //navigate to student-payment 
    addPayment(studentId,studentName){
      this.router.navigate(['student-payment',studentId,studentName]);
    }

    //clear student's previous payment details
    clearStudentPreviousPayment(studentId,studentName){
      this.instructorService.clearStudentPreviousPayment(studentId).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: studentName+'\'s account activated.',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['student-list']);
        },
        error => {
          console.log(error);
          Swal.fire({
            position: 'center',
            type: 'success',
            title: studentName+'\'s account not activated.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      )
    }
*/
  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
}
