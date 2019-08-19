import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentServiceService } from '../../service/student/student-service.service';
import { PackageModel } from '../../ClassModel/PackageModel';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CourseFee } from '../../ClassModel/CourseFeeModel';
import { HttpError } from '../../Shared/httpError/HttpError';



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
  newPayment:number=0.00;
  studentPackageId;

  isErrorPayment=false;
  errorPaymentMessage;  
  
  courseFee:number=0.00;//course fee
  balance:number=0.00;//balnace=coursefee-payment
  payment:number=0.00;

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
    this.errorMessage="Something bad happened, please try again later.";
    let httpError=new HttpError;
    httpError.ErrorResponse(error);
  };

  closeError(){
    this.errorMessage=null;
  }

   //button function


   doPaymentActive(){
    this.isPayment=true;
  }
 
   doPayment(packageId){
     
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

                //Payment Confirm Ok
                //call to API to add payment details
                //console.log(packageId+" "+this.studentId+" "+this.newPayment+" "+this.getStudentPackageId())
                let course=new CourseFee(-1,this.newPayment,new Date(),1,null);
               
                this.studentService.studentCourseFeeAdd(course,this.studentId,packageId).subscribe(
                  response => {
                    Swal.fire(
                      'Payment Succeed!'
                    )
                    
                    this.isPayment=false;

                    //refresh the StudentCourseFee
                    this.courseFeelist=[];
                    this.paymentDetails(packageId);
                    this.newPayment=0.00;
                    
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

  close(){
    this.isPayment=false;
  }
}
