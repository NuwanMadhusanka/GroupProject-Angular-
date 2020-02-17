import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { type } from 'os';



@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  errorMessage="";
  vehicles: VehicleModel[] = [];

 

  //Filter Option Implement
  filteredVehicles: VehicleModel[];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredVehicles = this.filterVehicle(value);
  }

  //Filtering method
  filterVehicle(searchString: string) {

    return this.vehicles.filter(vehicle =>
      vehicle.vehicleId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      vehicle.brand.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      vehicle.model.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      vehicle.number.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      vehicle.transmission.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 
     
    );
  }
  


  constructor(
    private router :Router,
    private vehicleService :VehicleServiceService
   
  ) { }
  ngOnInit() {
    console.log("In vehcle List in vhclListCom TS");
    this.vehicleList();
  }

  //get Student List
 
  vehicleList(){
    this.vehicleService.vehicleList().subscribe(
      response => {
        this.vehicles=response;
        this.filteredVehicles=this.vehicles;
        console.log(response);
      },
      error => {
        this.handleErrorResponse(1,error);
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

  // //error handling
  // private handleErrorResponse(error: HttpErrorResponse) {
  //   let httpError = new HttpError();
  //   httpError.ErrorResponse(error);
  // }

    //navigate to studentRegister Page
    addVehicle(){
      
      this.router.navigate(['vehicle-add']);
      console.log("In vehcle add in vhclListCom TS22");
    }

    vehicleCategory(){
      console.log("In vehicle-category in vhclListCom TS22");
      this.router.navigate(['vehicle-category-add']);
    }

    addVehicleCategory(){
      
      this.router.navigate(['vehicle-category-add']);
      console.log("In vehicle-category-add in vhclListCom TS22");
    }

    moreDetails(vehicleId){
      console.log(vehicleId)
      this.router.navigate(['vehicle-more-details' ,vehicleId]);
      console.log("In vehicle-more-details in vhclListCom TS22");
    }

    instructorAssign(){
      console.log("In instructor assign in vhclListCom ts");
      this.router.navigate(['instructor-assign']);
    }

    // deleteVehicle(vehicleId){
    //   console.log(vehicleId);
    //   console.log("In vehicle delete in vhclListCom TS22");
    // }
    //delete Video
    deleteVehicle(vehicleId:Number){
    console.log("In vehicle delete in vhclListCom TS");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete vehicle Details and all other relevant information.Can't revert the Data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.vehicleService.deleteVehicle(vehicleId).subscribe(
          response => {
            this.vehicleList(); 
            Swal.fire(
              'Deleted!',
              'Vehicle Record has been deleted.',
              'success'
            )
          },
          error => {
            console.log(error);
         //   this.handleErrorResponse(type:any,error);
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Delete Is Not Successful!',
              footer: 'Something bad happened, please try again later.'
            })
          }
           
        )
      }
    })
  }

  
    closeError(){
      this.errorMessage="";
    }
  
   
    handleErrorResponse(type,error){
      if(type==1){
        this.errorMessage="There is a problem with the service. please try again later.";
      }
      let httpError = new HttpError();
      httpError.ErrorResponse(error);
    }
  
}

