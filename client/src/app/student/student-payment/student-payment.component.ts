import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentServiceService } from '../../service/student/student-service.service';
import { StudentPackage } from '../student-package-add/student-package-add.component';
import { PackageModel } from '../../ClassModel/PackageModel';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { CourseFee } from '../../ClassModel/CourseFeeModel';



@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private studentService:StudentServiceService
  ) { }

  studentId:Number;
  studentPackages:PackageModel[]=[];//student follwing packages
  errorMessage;
  isSelectPackage:Boolean=false;
  selectPackage:PackageModel;
  courseFeelist:[];
  isPayment=false;
  newPayment;
  studentPackageId;

  isErrorPayment=false;
  errorPaymentMessage;  
  
  courseFee:number;//course fee
  balance:number;//balnace=coursefee-payment
  payment:number;

  regexp:any;//Regular Expression for new Payment

  ngOnInit() {
    this.studentId=this.route.snapshot.params['id'];//get student id by url
    this.studentPackageList();
  }

  //studentFollow Packages
  studentPackageList(){
      
    //get Student following packages Id
    this.studentService.studentPackages(this.studentId).subscribe(
      response => {
          this.studentPackages=response;
          if(this.studentPackages.length <= 0){
            console.log("No any Packages")
            this.errorMessage="Student Not Following Any Packages"
          }else{
            console.log(this.studentPackages)
          }
          
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  //show payment details
  paymentDetails(packageId){
      //console.log(packageId)

    //call to the API and get student Payment Details
    this.studentService.studentCourseFees(this.studentId,packageId).subscribe(
      response => {
          this.courseFeelist=response;


          //calculate student installments
          let total:number=0;
          this.courseFeelist.forEach(element => {
            total+=element[1];
          });
          this.payment=total;
          
          //find course fee
          this.studentPackages.forEach(element =>{
              if(element.packageId===packageId){
                this.courseFee=element.price;
              }
          });

          //calculate balance
          this.balance=this.courseFee-this.payment;

      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

      this.isSelectPackage=true;
      this.studentPackages.forEach(element => {
        if(element.packageId == packageId){
          this.selectPackage=element;
        }
      });
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage="Not successful request";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorMessage="Check the Network Connection"
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  closeError(){
    this.errorMessage=null;
  }

   //button function


   doPaymentActive(){
    this.isPayment=true;
  }
 
   doPayment(packageId){
      //console.log(this.newPayment)
      if(this.isValidCash()){
          if(this.newPayment>this.balance){
              this.errorPaymentMessage="can't pay more than Rs: "+this.balance;
          }else{
            this.errorPaymentMessage="";
           

            //Payment Confirmation
            Swal.fire({
              title: 'Are you sure?',
              text: "Can't revert(delete/Update) after Payment done!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Do Payment!'
            }).then((result) => {
              if (result.value) {
                 //console.log("ok")

                //Payment Confirm Ok
                //call to API to add payment details
                //console.log(packageId+" "+this.studentId+" "+this.newPayment+" "+this.getStudentPackageId())
                let course=new CourseFee(null,this.newPayment,new Date(),1,null);
                console.log(course);
                this.studentService.studentCourseFeeAdd(course,this.getStudentPackageId()).subscribe(
                  response => {
                    Swal.fire(
                      'Payment Succeed!'
                    )
                    this.isPayment=false;
                    //refresh the StudentCourseFee
                    this.courseFeelist=[];
                    this.paymentDetails(packageId);
                  }, 
                  error =>{
        
                    console.log(error);
                    this.handleErrorResponse(error);
        
                    Swal.fire({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                      footer: ''+this.errorMessage
                    })
        
                    
                  }
                )
              }
            })

          }
      }
   }

   isValidCash(){
    if(this.newPayment != null){
      this.regexp = new RegExp('\\d');
      let test = this.regexp.test(this.newPayment);
      if(test){
        if(this.newPayment>0){
            return true;
        }
      }
      
    }
    this.errorPaymentMessage="Insert Valid Payment."
    return false;
  }

  //get StudentPackage Id
  getStudentPackageId(){
    this.courseFeelist.forEach(element => {
      this.studentPackageId=element[4]
    });
    return this.studentPackageId;
  }
}
