import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { MaintainanceServiceService } from '../../service/maintainance/maintainance-service.service';
import { VehicleMaintainanceModel } from '../../ClassModel/MapObject/VehicleMaintainance';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-maintainance',
  templateUrl: './vehicle-maintainance.component.html',
  styleUrls: ['./vehicle-maintainance.component.scss']
})
export class VehicleMaintainanceComponent implements OnInit {

  errorMessage;
  vehicleId;
  type:String="";
  description:String="";
  amount:Number;
  maintainanceId;

  maintainanceListData:VehicleMaintainanceModel[];

  isUpdateVariable=false;
  updateMaintainance:VehicleMaintainanceModel;
  errorType;
  errorDescription;
  errorAmount;


  //add new main
  isAddMaintainance=false;
  newMaintainance = new VehicleMaintainanceModel(-1,this.type,this.description,this.amount,this.vehicleId);
  errorTypeNew;
  errorDescriptionNew;
  errorAmountNew;


  filteredMaintain: VehicleMaintainanceModel[];
  private _searchTerm: string;
vehicleCategoryId: any;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredMaintain = this.filterMaintain(value);
  }

  //Filtering method
  filterMaintain(searchString: string) {

    return this.maintainanceListData.filter(maintain =>
      maintain.maintainanceId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      maintain.type.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      maintain.description.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      maintain.amount.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 
      // vehicle.number.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      // vehicle.transmission.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );
  }


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private maintainanceService:MaintainanceServiceService
  ) { }

  ngOnInit() {
    this.vehicleId=this.route.snapshot.params['id'];
    this.maintainanceData(this.vehicleId);
  }

  maintainanceData(vehicleId){
    console.log("in vehicle maintainance list");
    this.maintainanceService.maintainanceList(vehicleId).subscribe(
      response => {
          this.maintainanceListData=response;
          console.log(response)
      },
      error =>{
          console.log(error);
          this.handleErrorResponse(error);
      }
    );
  }




  // handleErrorResponse(error: HttpErrorResponse) {
  //   this.errorMessage="There is a problem with the service. please try again later.";
  //   let httpError = new HttpError();
  //   httpError.ErrorResponse(error);
  // };
// Add new Time Slot Section
addVehicleCategory(){
  this.isAddMaintainance=true;
  this.errorType="";
  this.errorDescription="";
  this.errorAmount="";
}



saveConfirm(){
  this.errorType="";
  this.errorDescription="";
  this.errorAmount="";

  let errorFlag=false;
 

  
  //validate type
  if(this.type == null){
    this.errorType="Insert valid type.";
    errorFlag=true;
}

   //validate description
   if(this.description == null){
    this.errorDescription="Insert Valid description.";
    errorFlag=true;
}


   //validate amount
   if(this.amount == null){
    this.errorAmount="Insert Valid amount.";
    errorFlag=true;
}

if(!errorFlag){
  console.log(this.type);
  console.log(this.description);
  console.log(this.amount);
  console.log("in vehcle main add cmts after adding");
  console.log("in saveConfirm vehicle main add cmts");
  this.newMaintainance = new VehicleMaintainanceModel(-1,this.type,this.description,this.amount,this.vehicleId);

   this.maintainanceService.addMaintainance(this.newMaintainance).subscribe(
          response => {
              console.log(response);
              Swal.fire('Save is Completed.');
              this.maintainanceListData=[];
              this.maintainanceData(this.vehicleId);
              this.isAddMaintainance=false;
          },
          error => {
            console.log(error);
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Save is not Successful!',
              footer: 'Something bad happened, please try again later.'
            });
            this.handleErrorResponse(error);
          }
        )
    }
  
}

//Finish Add new Time Slot Section

// Delete Time Slot Section
delete(vehicleCategoryId:Number){
  Swal.fire({
    title: 'Are you sure?',
    text: "Delete Time Slot of ",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      
     //Call to API
     this.maintainanceService.deleteMaintainance(this.maintainanceId).subscribe(
      response => {
        
        this.maintainanceData(this.vehicleId); 
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

// Finish Delete Time Slot Section

//error handling
// private handleErrorResponse(error: HttpErrorResponse) {
//   this.errorMessage=this.httpError.ErrorResponse(error);
//   console.log(this.errorMessage);
// };

handleErrorResponse(error: HttpErrorResponse) {
  this.errorMessage="There is a problem with the service. please try again later.";
  let httpError = new HttpError();
  httpError.ErrorResponse(error);
};

//button(close)
close(){
  this.isUpdateVariable=false;
}

closeAddMaintainance(){
  this.isAddMaintainance=false;
}

}



