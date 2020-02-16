import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { InsurancePaymentModel } from '../../ClassModel/InsurancePaymentModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';

@Component({
  selector: 'app-vehicle-insurance',
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.scss']
})
export class VehicleInsuranceComponent implements OnInit {

  role:number;

  vehicleId:Number;
  vehicleName:String;
  vehicleNumber:String;
  vehicleInsurancePayments :InsurancePaymentModel[]=[];
  isInsurancePayment = false;

  selectInsurancePayment :InsurancePaymentModel;
  isSelectInsurancePayment = false;

  errorMessage:String;

  constructor(
    private route :ActivatedRoute,
    private router :Router,
    private vehicleService :VehicleServiceService
  ) { }

  ngOnInit() {
    
    this.role = +sessionStorage.getItem("userRole");
    if(this.role==null || this.role==2 || this.role ==4 || this.role==5){
        this.router.navigate(['/']);
    }

    this.vehicleId = this.route.snapshot.params['id'];
    this.vehicleName = this.route.snapshot.params['vehName'];
    this.vehicleNumber = this.route.snapshot.params['vehNumber'];
    if(this.vehicleId==null){
      this.router.navigate(['/']);
    }
    this.getVehicleInsurancePaymentDetails();
  }

  getVehicleInsurancePaymentDetails(){
    this.vehicleService.getVehicleInsurancePaymentDetails(this.vehicleId).subscribe(
      response => {
        this.vehicleInsurancePayments = response;
        if(this.vehicleInsurancePayments.length==0){
          this.errorMessage = "No any insurance details for this vehicle";
        }else{
          this.isInsurancePayment=true;
          let flag=true;
          let date = new Date();
          let year = date.getFullYear();
          this.vehicleInsurancePayments.forEach(element => {
            if(element.year==year){
              flag=false;
            }
          });
          if(flag){
            this.errorMessage="Not insert insurance payment details for this year";
          }
        }
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getInsurancePayment(insurancePaymentId:Number){
    this.vehicleInsurancePayments.forEach(element => {
      if(element.insurancePaymentId==insurancePaymentId){
        this.selectInsurancePayment=element;
        this.isSelectInsurancePayment=true;
      }
    });
  }

  addVehicleInsurance(){
    this.router.navigate(['vehicle-insurance-add',this.vehicleId,this.vehicleName,this.vehicleNumber]);
  }

  closeError(){
    this.errorMessage="";
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
