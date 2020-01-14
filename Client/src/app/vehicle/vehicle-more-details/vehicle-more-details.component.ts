import { Component, OnInit } from '@angular/core';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';
import { HttpError } from '../../Shared/httpError/HttpError';
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



  vehicleCategory: VehicleCategoryModel = new VehicleCategoryModel(1, 'q', 1);
  vehicleData: VehicleModel = new VehicleModel(1, 'q', 'q', 1,1,'q',1,'q', this.vehicleCategory);
  vehicleId: any;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleServiceService,
  
  ) { }

  ngOnInit() {
    this.vehicleId = this.route.snapshot.params['id'];//get video id by url
    console.log("In Video more detils ts");
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
 
  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = this.httpError.ErrorResponse(error);
    console.log(this.errorMessage);
  };

  closeError() {
    this.errorMessage = null;
  }


}

