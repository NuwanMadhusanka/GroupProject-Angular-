import { Component, OnInit } from '@angular/core';
import { HttpError } from '../../Shared/httpError/HttpError';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-category-add',
  templateUrl: './vehicle-category-add.component.html',
  styleUrls: ['./vehicle-category-add.component.scss']
})
export class VehicleCategoryAddComponent implements OnInit {

  // vehicleCategory: VehicleCategoryModel[] = [];
  errorMessage;
  httpError:HttpError;
  category:String="";
  numStudent:Number;


  vehicleCategorListData:VehicleCategoryModel[]=[];

  //update Variables
  isUpdateVariable=false;
  updateVehicleCategory:VehicleCategoryModel;
  errorCategory;
  errorNum_student;


  //add new timeSlot
  isAddVehicleCategory=false;
  newVehicleCategory = new VehicleCategoryModel(-1,this.category,this.numStudent);
  errorCategoryNew;
  errorNum_studentNew;

  //validation
  // timeTableValidation = new TimeTableValidation();


    //Filter Option Implement
    filteredVehiclecats: VehicleCategoryModel[];
    private _searchTerm: string;
    get searchTerm(): string {
      return this._searchTerm;
    }
    set searchTerm(value: string) {
      this._searchTerm = value;
      this.filteredVehiclecats = this.filterVehicleCat(value);
    }
  
    //Filtering method
    filterVehicleCat(searchString: string) {
  
      return this.vehicleCategorListData.filter(vehicleCat =>
        vehicleCat.vehicleCategoryId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
        vehicleCat.category.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
        vehicleCat.numStudent.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 
        // vehicle.number.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
        // vehicle.transmission.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
      );
    }

  constructor(
    private router:Router,
    private vehicleService:VehicleServiceService
  ) { }

  ngOnInit() {
    this.vehicleCategoryList();
  }

   //get time slot data
   vehicleCategoryList(){
    console.log("in vehicle ctgry add cmts");
    this.vehicleService.getVehicleCategoryList().subscribe(
      response => {
          this.vehicleCategorListData=response;
      },
      error =>{
          console.log(error);
          this.handleErrorResponse(error);
      }
    );
  }

  //update time slot data


  isUpdate(vehicleCategory:VehicleCategoryModel){
    console.log("in isupdate vehicle ctgry add cmts");
    this.errorCategory="";
    this.errorNum_student="";
    this.isUpdateVariable=true;
    this.updateVehicleCategory=new VehicleCategoryModel(vehicleCategory.vehicleCategoryId, vehicleCategory.category, vehicleCategory.numStudent);
  }

  updateConfirm(){
    console.log("in updateconfirm vehicle ctgry add cmts");
    this.errorCategoryNew="";
    this.errorNum_studentNew="";
    if(this.updateVehicleCategory.category!=null){
      if(this.updateVehicleCategory.numStudent!=null){
        console.log(this.updateVehicleCategory.category);
        console.log(this.updateVehicleCategory.numStudent);
        Swal.fire({
          title: 'Are you sure?',
          text: "Is update the Vehicle Category(This result will effect to whole the Vehicle Category)",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!'
        }).then((result) => {
          if (result.value) {
            
            //Call to API
            this.vehicleService.updateVehicleCategory(this.updateVehicleCategory).subscribe(
              response => {
                  Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Update Completed',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.vehicleCategorListData=[];
                  this.vehicleCategoryList();
                  this.isUpdateVariable=false;
              },
              error => {
                console.log(error);
                Swal.fire({
                  position: 'center',
                  type: 'error',
                  title: 'Update is not completed',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.handleErrorResponse(error);
              }
            );
          }
        });
      }else{
        this.errorCategory="Insert Valid Category name";
      }
    }

    else{
      this.errorNum_student="Insert Valid number of students";
    }
}
   
  // Finish update time slot data 

 // Add new Time Slot Section
  addVehicleCategory(){
    this.isAddVehicleCategory=true;
    this.errorCategory="";
    this.errorNum_student="";}

  

  //   let errorFlag=false;
  //   //validate Category
  //   if(this.category == null){
  //     this.errorCategory="Insert valid category.";
  //     errorFlag=true;
  // }

  //    //validate NumStudents
  //    if(this.numStudent == null){
  //     this.errorNum_student="Insert Valid Number.";
  //     errorFlag=true;
  // }
  // console.log(this.category);
  // console.log(this.numStudent);

  // if(!errorFlag){
  //   console.log("in vehcle category add cmts after adding");
  
  //   this.vehicleService.addVehicleCategory(new VehicleCategoryModel(-1,this.category,this.numStudent)).subscribe(          response => {
  //           console.log(response);
  //           this.router.navigate(['vehicle-category-add'])}, 
  //         error => {
  //           //If some error occurs it is handled using handleErrorResponse method
  //           console.log(error);
  //           this.handleErrorResponse(error);
  //         }
  //       ) 
    
  // }
    
  // }
  saveConfirm(){
    this.errorCategory="";
    this.errorNum_student="";

    let errorFlag=false;
   

    
    //validate Category
    if(this.category == null){
      this.errorCategory="Insert valid category.";
      errorFlag=true;
  }

     //validate NumStudents
     if(this.numStudent == null){
      this.errorNum_student="Insert Valid Number.";
      errorFlag=true;
  }
 

  if(!errorFlag){
    console.log(this.category);
    console.log(this.numStudent);
    console.log("in vehcle category add cmts after adding");
    console.log("in saveConfirm vehicle ctgry add cmts");
    this.newVehicleCategory = new VehicleCategoryModel(-1,this.category,this.numStudent);

     this.vehicleService.addVehicleCategory(this.newVehicleCategory).subscribe(
            response => {
                console.log(response);
                Swal.fire('Save is Completed.');
                this.vehicleCategorListData=[];
                this.vehicleCategoryList();
                this.isAddVehicleCategory=false;
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
  delete(vehicleCategory:VehicleCategoryModel){
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Time Slot of "+vehicleCategory.category+" - "+vehicleCategory.numStudent,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.vehicleService.deleteVehicleCategory(vehicleCategory.vehicleCategoryId).subscribe(
          response => {
              if(response==0){//not delete because of foreignkey constrain
                Swal.fire({
                  position: 'center',
                  type: 'error',
                  title: 'Delete not successful.',
                  footer:'There is some lessons at this time slot',
                  showConfirmButton: false,
                  timer: 3000
                });
              }
              if(response==1){//delete success
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Delete Successful.',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
          },
          error => {
            console.log(error);
            this.handleErrorResponse(error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Delete not successful.',
              showConfirmButton: false,
              timer: 2000
            });
          }
           
        );
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

  closeAddVehicleCategory(){
    this.isAddVehicleCategory=false;
  }

}



