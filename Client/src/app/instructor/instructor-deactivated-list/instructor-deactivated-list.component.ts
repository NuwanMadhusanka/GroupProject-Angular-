import { Component, OnInit } from '@angular/core';
import { InstructorModel } from '../../ClassModel/InstructorModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';

@Component({
  selector: 'app-instructor-deactivated-list',
  templateUrl: './instructor-deactivated-list.component.html',
  styleUrls: ['./instructor-deactivated-list.component.scss']
})
export class InstructorDeactivatedListComponent implements OnInit {

  deactivatedInstructors: InstructorModel[];

  validation: UserValidation = new UserValidation();

  constructor(
    private instructorService: InstructorServiceService,
    private router: Router
  ) { }

  //Filter Option Implement
  filteredDeactivatedInstructors: InstructorModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredDeactivatedInstructors = this.filterInstructors(value);
  }

  filterInstructors(searchString: string) {
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

  deactivatedInstructorList() {
    this.instructorService.instructorList1(0).subscribe(
      response => {
        this.deactivatedInstructors = response;
        this.filteredDeactivatedInstructors = this.deactivatedInstructors;
      },
      error => {
        this.handleErrorResponse(error);
      }
    );
  }

  acivateInstructorAccount(instructorId, instructorName) {
    console.log("list com ts active Ins");
    Swal.fire({
      title: 'Are you sure?',
      text: "Activate instructor " + instructorId + "'s record?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate!'
    }).then((result) => {
      if (result.value) {
        //Call to API to check salary payments
        this.instructorService.checkInstructorSalaryPayments(instructorId).subscribe(
          response => {
            if (response == 1) { // salary payments are completed
              console.log("Res salary" + response + "insID" + instructorId);

              //proceed activation
              this.instructorService.activateInstructorAccount(instructorId).subscribe(
                response => {
                  if (response == 1) {     // account activated
                    console.log(response)
                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: instructorName + '\'s account activated.',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.deactivatedInstructorList();
                  } else {   //error in account activation
                    Swal.fire({
                      title: 'Error!!',
                      html: "Problem in activating account. ",
                      type: 'warning',
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'OK'
                    });

                  }
                },
                error => {
                  console.log(error);
                  Swal.fire({
                    title: 'Error!!',
                    html: "Problem in activating account. ",
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                  });
                  this.handleErrorResponse(error);
                }
              );

            }
            if (response == 0) { // instructor salary payments are not completed
              // console.log("Error in payments");
              Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Instructor Salary Payments  not Completed',
                text: 'Instructor' + instructorId + '\'s Salary payments are not completed. Proceed Aactivation ',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Aactivate!',
              }).then((result) => {
                if (result.value) { //confirm to proceed Activation 
                  //proceed activation
                  this.instructorService.activateInstructorAccount(instructorId).subscribe(
                    response => {
                      if (response == 1) {     // account activated
                        console.log(response)
                        Swal.fire({
                          position: 'center',
                          type: 'success',
                          title: instructorName + '\'s account activated.',
                          showConfirmButton: false,
                          timer: 2000
                        });
                        this.deactivatedInstructorList();
                      } else {   //error in account activation
                        Swal.fire({
                          title: 'Error!!',
                          html: "Problem in activating account. ",
                          type: 'warning',
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'OK'
                        });

                      }
                    },
                    error => {
                      console.log(error);
                      Swal.fire({
                        title: 'Error!!',
                        html: "Problem in activating account. ",
                        type: 'warning',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                      });
                      this.handleErrorResponse(error);
                    }
                  );


                }
              })
            }
          },
          error => {
            this.handleErrorResponse(error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: '167 InstructorID ' + instructorId + '\'s profile was not deactivated ',
              showConfirmButton: false,
              timer: 3000
            });
          }
        );//
        /*
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
              this.deactivatedInstructorList();
            }else{   //error in account activation
              Swal.fire({
                title: 'Error!!',
                html: "Problem in activating account. ",
                type: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              });
    
            }
           },
           error => {
             console.log(error);
             this.handleErrorResponse(error);
           }
          
         );*/
      }
    })
  }
  /*
    checkSalaryPayments(instructorId){
       this.instructorService.checkInstructorSalaryPayments(instructorId).subscribe(
        response => {
         console.log("Paid");
        },
        error => {
          this.handleErrorResponse(error);
        }
      );
    }*/
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
