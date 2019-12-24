import { Component, OnInit } from '@angular/core';
import { PaymentValidation } from '../../Shared/validation/payment-validation/payment-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { FuelPaymentModel } from '../../ClassModel/FuelPaymentModel';

@Component({
  selector: 'app-vehicle-fuel',
  templateUrl: './vehicle-fuel.component.html',
  styleUrls: ['./vehicle-fuel.component.scss']
})
export class VehicleFuelComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

  vehicleFuelList:FuelPaymentModel[]=[];

  isAddSelect=false;              
  selectMonth:Number;
  amount:number;

  errorSelectMonth:String;
  errorAmount:String;

  paymentValidate:PaymentValidation;

  constructor(
    private vehicleService :VehicleServiceService
  ) { }

  ngOnInit() {
    this.getVehicleFuelData();
    this.paymentValidate = new PaymentValidation();
  }

  getVehicleFuelData(){
    this.vehicleService.getFuelData().subscribe(
      response => {
        this.vehicleFuelList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  vehicleFuelAdd(){
    let error=false;
    this.errorSelectMonth="";
    this.errorAmount="";

    if(!this.paymentValidate.isValidCash(this.amount)){
      this.errorAmount="Insert Valid Amount";
      error=true;
    }
    if(this.selectMonth==null){
      this.errorSelectMonth="Select the month";
      error=true;
    }

    if(!error){
      Swal.fire({
        title: 'Are you sure?',
        text: "Can't revert(delete/Update) after vehicle fuel data insert to the system!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Saved!'
      }).then((result) => {
        this.vehicleService.addVehicleFuelData(+sessionStorage.getItem("userId"),new FuelPaymentModel(-1,this.selectMonth,this.amount,null)).subscribe(
          response => {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Save Successful.',
              showConfirmButton: false,
              timer: 2000
            });
            this.selectMonth=null;
            this.amount=null;
            this.isAddSelect=false;
            this.getVehicleFuelData();
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

  addVehicle(){
    this.isAddSelect=true;
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
