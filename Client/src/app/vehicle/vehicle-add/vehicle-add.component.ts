import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService} from '../../service/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentServiceService } from '../../service/student/student-service.service';
import { UserModel } from '../../ClassModel/UserModel';
import { StudentModel } from '../../ClassModel/StudentModel';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import Swal from 'sweetalert2';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { InstructorModel } from '../../ClassModel/InstructorModel';
// import { VehicleCategoryModel } from '../../ClassModel/Map)bject/VehicleCategory';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';
//import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';


@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {
  [x: string]: any;

  VehicleCategoryListData:VehicleCategoryModel[]=[];
  fuel_typeData:VehicleModel[]=[];
  transmisionData:VehicleModel[]=[];

  //form variables
  // vehicleId:Number;
  brand:String="";
  number:String="";
  model:String="";
  fuel_type:Number;
  transmission:Number;
  document_lic:String="";
  // instructor_id:InstructorModel;
  status:Number;
  vehicle_category_id:VehicleCategoryModel;
 // vehicle_category_id:Number;

  // insurance_period:Date;
  

  //form error messages variables
  // errorVehicleId;
  errorBrand;
  errorNumber;
  errorModel;
  errorFuelType;
  errorTransmission;
  errorDocumentLic;
  errorStatus;
  
  errorVehicleCategoryId;
  // errorInsurancePeriod;
  
 

  errorMessage:String;
  regexp:any;//Regular Expression for NIC
  test:boolean;//Regular exprssion result
  instructor_id: InstructorModel;
 // VehicleCategoryModel: any;
  // vehicle_category_id: VehicleCategoryModel;
  // fuel_typeData: VehicleModel[];
  // transmisionData: VehicleModel[];

  //idate:Date;
  
  //user Validation Instance
  // userValidation = new UserValidation();
  // resource: any;
  // description: any;
  // title: any;
  // adminStaff: any;
  // addedDate: any;

  constructor(
   private router:Router,
  // private adminStaffService:AdminStaffServiceService,
   private vehicleService:VehicleServiceService,
   private instructorService :InstructorServiceService
  ) { }

  ngOnInit() {
    console.log("In vehicle add comTs"); 
    this.getVehicleCategoryLit();
  }

  //Student Registration Funtion
  addVehicle(){
    console.log("In vehcle add in vhcladdCom TS");
    let errorFlag=false;

    this.errorBrand="";
    this.errorNumber="";
    this.errorModel="";
    this.errorFuelType="";
    this.errorTransmission="";
    this.errorDocumentLic="";
    this.errorStatus="";
    // this.errorInsurancePeriod="";


 //validate Brand
    if(this.brand == null){
      this.errorBrand="Insert Brand.";
      errorFlag=true;
  }

     //validate Number
     if(this.number == null){
      this.errorNumber="Insert Vehicle Number.";
      errorFlag=true;
  }
     
     //validate Model

     if(this.model == null){
      this.errorModel="Insert Vehicle Model.";
      errorFlag=true;
  }


    //  validate fuel_type
     if(this.fuel_type == null){
      this.errorFuelType="fuel_type should be selected.";
      errorFlag=true;
  }

  //  validate transmission

   if(this.transmission == null){
    this.errorTransmission="transmission should be selected.";
    errorFlag=true;
}

     //validate document_lic
     if(this.document_lic == null){
      this.errorDocumentLic="Insert Vehicle License Document.";
      errorFlag=true;
  }


    //  validate status

     if(this.status == null){
      this.errorStatus="status should be selected";
      errorFlag=true;
  }
    

     //validate insurance_period
  //    if(this.insurance_period == null){
  //     this.errorInsurancePeriod="Insert Vehicle insurance_period.";
  //     errorFlag=true;
  // }

  
    //  validate vehicleCategiryId

    if(this.vehicle_category_id == null){
      this.errorVehicleCategoryId="insert vcid";
      errorFlag=true;
  }

  //Save to the DB
  console.log(this.brand);
  console.log(this.model);
  console.log(this.number);
  console.log(this.document_lic);
  console.log(this.transmission);
  console.log(this.fuel_type);
  console.log(this.vehicle_category_id);
  console.log(this.status);
  // console.log(this.insurance_period);
  if(!errorFlag){
    console.log("in vehcle add cmts after adding");
    this.vehicleService.VehicleAdd(new VehicleModel(-1,this.brand,this.model,this.fuel_type,this.transmission,this.document_lic,this.status,this.number,this.VehicleCategoryModel.vehicle_category_id).subscribe(
          response => {
            console.log(response);
           
         Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Save Successful.',
          showConfirmButton: false,
          timer: 1500
          });
          this.router.navigate(['vehicle-list'])
       },
       error => {
        console.log(error);
        this.handleErrorResponse(error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: "Save Not Completed.",
          footer: 'Something bad happened, please try again later.'
        });
       }
     ) );
    }
  }
  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  };


  showfuel_type(){
    this.vehicleService.vehicleList().subscribe(
      response => {
          this.fuel_typeData=response;
      },
      error => {
          console.log(error);
          this.handleErrorResponse(error);
      }
    );
  }
  Showtransmission(){
    this.vehicleService.vehicleList().subscribe(
      response => {
          this.transmisionData=response;
      },
      error => {
          console.log(error);
          this.handleErrorResponse(error);
      }
    );
  }
  //get vehicle category Details
  getVehicleCategoryLit(){
    this.vehicleService.getVehicleCategoryList().subscribe(
      response => {
        this.VehicleCategoryListData=response;
    },
    error => {
        console.log(error);
        this.handleErrorResponse(error);
    }
  );
}

  
  
}
