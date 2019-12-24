import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { Router } from '@angular/router';



@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {

  vehicleList:VehicleModel[]=[];

  constructor(
    private vehicleService :VehicleServiceService,
    private router :Router
  ) { }

  ngOnInit() {
    this.getVehicleList(1);
  }

  getVehicleList(status:Number){
    this.vehicleService.getVehicleList(status).subscribe(//get active vehicles
      response => {
        this.vehicleList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  vehicleRedirect(vehicle:VehicleModel,type:Number){
    if(type==3){
      let vehName = vehicle.brand+" "+vehicle.model;
      this.router.navigate(['vehicle-insurance',vehicle.vehicleId,vehName,vehicle.number]);
    }
  }

  vehicleFuelData(){
    this.router.navigate(['vehicle-fuel']);
  }

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
}

