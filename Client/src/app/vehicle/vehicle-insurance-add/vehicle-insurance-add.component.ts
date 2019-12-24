import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentValidation } from '../../Shared/validation/payment-validation/payment-validation';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { InsurancePaymentModel } from '../../ClassModel/InsurancePaymentModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-insurance-add',
  templateUrl: './vehicle-insurance-add.component.html',
  styleUrls: ['./vehicle-insurance-add.component.scss']
})
export class VehicleInsuranceAddComponent implements OnInit {

  vehicleId :Number;
  vehicleName :String;
  vehicleNumber :String;

  year:Number;
  amount:Number;
  from:Date;
  to:Date;

  errorYear:String;
  errorAmount:String;
  errorFrom:String;
  errorTo:String;

  paymentValidation :PaymentValidation;
  userValidation :UserValidation;

  constructor(
    private vehicleService :VehicleServiceService,
    private route :ActivatedRoute,
    private roter :Router
  ) { }

  ngOnInit() {
    this.vehicleId = this.route.snapshot.params['id'];
    this.vehicleName = this.route.snapshot.params['vehName'];
    this.vehicleNumber = this.route.snapshot.params['vehNumber'];
    if(this.vehicleId==null){
      this.roter.navigate(['/']);
    }

    this.paymentValidation = new PaymentValidation();
    this.userValidation = new UserValidation();
  }

  registerInsuranceData(){
    let error = false;
    this.errorYear="";
    this.errorFrom="";
    this.errorTo="";
    this.errorAmount=""

    if(!this.paymentValidation.isValidCash(this.amount)){
        this.errorAmount="Insert Valid Amount";
        error = true;
    }

    if(!this.userValidation.isValidExamDateTrialDate(this.from,this.to)){
      this.errorFrom = "From date should be less than To date";
      this.errorTo = "To data should be greater than From date";
      error=true;
    }

    if(this.year==null || this.year<=0){
      this.errorYear="Insert valid year";
      error=true;
    }

    if(!error){
      Swal.fire({
        title: 'Are you sure?',
        text: "Can't revert(delete/Update) after insurance payment insert to the system!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Saved!'
      }).then((result) => {
        this.vehicleService.addInsurancePayment(this.vehicleId,new InsurancePaymentModel(-1,new Date(),this.amount,this.from,this.to,this.year,null)).subscribe(
          response => {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Save Successful.',
              showConfirmButton: false,
              timer: 2000
            });
            this.roter.navigate(['vehicle-insurance',this.vehicleId,this.vehicleName,this.vehicleNumber]);
          },
          error => {
            console.log(error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Save Not Completed',
              showConfirmButton: false,
              timer: 2000
            });
            this.handleErrorResponse(error);
          }
        );   
      });
      
    }
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
