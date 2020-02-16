import { Component, OnInit } from '@angular/core';
import { HttpError } from '../../Shared/httpError/HttpError';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { ActivatedRoute } from '@angular/router';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-more-details',
  templateUrl: './vehicle-more-details.component.html',
  styleUrls: ['./vehicle-more-details.component.scss']
})
export class VehicleMoreDetailsComponent implements OnInit {

  errorMessage;
  errorUpdateMessage = "";
  httpError = new HttpError();
  vehicleId;
  isUpdateVariable = false;
  selectOption;//updated variable Name(number)
  updateVariable;
  placeHolder;
  updateName;//update variable Name
  confirmUpdate = false;


  vehicleCategory: VehicleCategoryModel = new VehicleCategoryModel(1, 'q', 1);
  vehicleData: VehicleModel = new VehicleModel(1, 'q ', 'q ', 1,1,' q',null,1,' q',1 ,this.vehicleCategory);
  // vehicleData: VehicleModel;
 // vehicleId: any;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleServiceService,
  
  ) { }

  ngOnInit() {
    this.vehicleId = this.route.snapshot.params['id'];//get vehicle id by url
    console.log("In vehicle more detils ts");
    console.log(this.vehicleId)
    this.VehicleDetails();
  }



  VehicleDetails() {

    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      response => {
        console.log("In vehicle Details success");
        console.log(this.vehicleId);
        this.vehicleData = response;
        console.log(this.vehicleData);
      },
      error => {
        console.log(error);
        console.log("In details error");
        this.handleErrorResponse(error);
      }
    )
  }

  
  isUpdate(option) {
    this.errorUpdateMessage = "";
    console.log(option);
    if ((option === 1)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Brand"; this.updateName = "Brand"; this.updateVariable = this.vehicleData.brand; }
    if ((option === 2)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Model"; this.updateName = "Model"; this.updateVariable = this.vehicleData.model; }
    if ((option === 3)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Number"; this.updateName = "Number"; this.updateVariable = this.vehicleData.number; }
    if ((option === 4)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Transmission"; this.updateName = "Transmission"; this.updateVariable = this.vehicleData.transmission; }
    if ((option === 5)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New FuelType"; this.updateName = "FuelType"; this.updateVariable = this.vehicleData.fuelType; }
    if ((option === 6)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Document License"; this.updateName = "License"; this.updateVariable = this.vehicleData.documentLic; }
    
  }

  update() {


  //Brand
    if (this.selectOption == 1) {
      if ((this.updateVariable == "")) {
        this.errorUpdateMessage = "Insert Valid Brand.";
      } else {
        this.vehicleData.brand = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

      //Model
      if (this.selectOption == 2) {
        if ((this.updateVariable == "")) {
          this.errorUpdateMessage = "Insert Valid Model.";
        } else {
          this.vehicleData.model = this.updateVariable;
          this.errorUpdateMessage = "";
          this.isUpdateVariable = false;
          this.confirmUpdate = true;
        }
      }

        //Number
    if (this.selectOption == 3) {
      if ((this.updateVariable == "")) {
        this.errorUpdateMessage = "Insert Valid Number.";
      } else {
        this.vehicleData.number = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

      //Transmission
      if (this.selectOption == 4) {
        if ((this.updateVariable == "")) {
          this.errorUpdateMessage = "Insert Valid Transmission.";
        } else {
          this.vehicleData.transmission = this.updateVariable;
          this.errorUpdateMessage = "";
          this.isUpdateVariable = false;
          this.confirmUpdate = true;
        }
      }

        //FuelType
    if (this.selectOption == 5) {
      if ((this.updateVariable == "")) {
        this.errorUpdateMessage = "Insert Valid FuelType.";
      } else {
        this.vehicleData.fuelType = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

      //Document License
      if (this.selectOption == 6) {
        if ((this.updateVariable == "")) {
          this.errorUpdateMessage = "Insert Valid License Document.";
        } else {
          this.vehicleData.documentLic = this.updateVariable;
          this.errorUpdateMessage = "";
          this.isUpdateVariable = false;
          this.confirmUpdate = true;
        }
      }








  }


  close() {
    this.isUpdateVariable = false;
  }



  //save updates
  saveUpdate() {
    //Save Update data(API)
    this.vehicleService.updateVehicle(this.vehicleData).subscribe(
      response => {
        console.log(response)
        Swal.fire('Update is Completed.')
        this.confirmUpdate = false;
        this.vehicleData = response;

      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Update is not Successful!',
          footer: 'Something bad happened, please try again later.'
        })
      }

    )
  }
 
  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = this.httpError.ErrorResponse(error);
    console.log(this.errorMessage);
  };

  closeError() {
    this.errorMessage = null;
  }

}
