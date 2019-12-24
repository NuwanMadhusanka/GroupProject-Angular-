import { Component, OnInit } from '@angular/core';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';
import { PackageServiceService } from '../../service/package/package-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { PaymentValidation } from '../../Shared/validation/payment-validation/payment-validation';
import { PackageModel } from '../../ClassModel/PackageModel';
import Swal from 'sweetalert2';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';
import { Router } from '@angular/router';
import { NotificationServisceService } from '../../service/notification/notification-service.service';
import { WebSocketCommunicationDataMap } from '../../ClassModel/MapObject/WebSocketCommunicationDataMap';


@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.scss']
})
export class PackageAddComponent implements OnInit {

  vehicleCategoryListData:VehicleCategoryModel[];
  
  
  title:String;
  selectVehicleCategory:VehicleCategoryModel;
  manualLesson:number;
  autoLesson:number;
  price:number;
  studentBasicPayment:number;
  description:String;

  transmission='';
  errorTransmission='';
  selectManualTransmission=false;
  selectAutoTransmission=false;
  isErrorTransmission=false;
  isTransmissionSelect=false;
  isDisableAutoLesson=true;
  isDisableManualLesson=true;
  isSelectVehicleCategory=false;
  isSelectFile=false;

  errorTitle:String;
  errorAutoLesson:String;
  errorManualLesson:String;
  errorPrice:String;
  errorDescription:String;
  errorStudentBasicPayment:String;
  errorVehicleCategory:String;

  selectedFiles;
  showSpinner=false;
  errorMessage:String;


  constructor(
    private packageService :PackageServiceService,
    private fileUploadService :FileUploadServiceService,
    private router :Router,
    private notificationService:NotificationServisceService
  ) { }

  ngOnInit() {
    this.getVehicleCategoryList();
  }

  getVehicleCategoryList(){
    this.packageService.getVehicleCategoryList().subscribe(
      response => {
        this.vehicleCategoryListData=response;
      },
      error => {
        console.log(error);
      }
    );
  }

  showTransmission(vehicleCategory:VehicleCategoryModel){
    this.isTransmissionSelect=false;
    this.isErrorTransmission=false;
    this.selectManualTransmission=false;
    this.selectAutoTransmission=false;
    this.isDisableManualLesson=true;
    this.isDisableAutoLesson=true;
    this.isSelectVehicleCategory=false;
    this.transmission='';
    this.errorVehicleCategory="";

    this.packageService.getVehcleCategoryTransmission(vehicleCategory.vehicleCategoryId).subscribe(
      response => {
        if(response==3){//Has both manual/auto vehcles
          this.isTransmissionSelect=true;
          this.selectManualTransmission=true;
          this.isDisableManualLesson=false;
          this.isSelectVehicleCategory=true;
        }else if(response==1){
          this.transmission="Manual";
          this.selectManualTransmission=true;
          this.isDisableManualLesson=false;
          this.isSelectVehicleCategory=true;
        }else if(response==2){
          this.transmission="Auto"
          this.selectAutoTransmission=true;
          this.isDisableAutoLesson=false;
          this.isSelectVehicleCategory=true;
        }else{//response is 0
          this.isErrorTransmission=true;
          this.errorTransmission="There is no any vehicle in this vehicle category.";
        }
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  selectTransmission(transmission:Number){
    if(transmission==1){
      (this.selectManualTransmission ? this.selectManualTransmission=false : this.selectManualTransmission=true); 
      (this.selectManualTransmission ? this.isDisableManualLesson=false : this.isDisableManualLesson=true);
    }
    if(transmission==2){
      (this.selectAutoTransmission ? this.selectAutoTransmission=false : this.selectAutoTransmission=true);
      (this.selectAutoTransmission ? this.isDisableAutoLesson=false : this.isDisableAutoLesson=true);
    }
  }

  registerPackage(){
      let isAnyError=false;
      this.errorTitle="";
      this.errorAutoLesson="";
      this.errorManualLesson="";
      this.errorVehicleCategory="";
      this.errorPrice="";
      this.errorDescription="";
      this.errorStudentBasicPayment="";
      //validation
      let paymentValidation = new PaymentValidation();

      if(this.title==null || this.title==' '){
        this.errorTitle="Title is mandatory";
        isAnyError=true;
      }


      if(!this.isSelectVehicleCategory){
        this.errorVehicleCategory="Select Vehicle Category";
        isAnyError=true;
      }else{
        if(this.selectManualTransmission){
          if(this.manualLesson==null || this.manualLesson<=0){
            this.errorManualLesson="Insert Valid Manual Lessons";
            isAnyError=true;
          }
        }
        if(this.selectAutoTransmission){
          if(this.autoLesson==null || this.autoLesson<=0){
            this.errorAutoLesson="Insert Valid Auto Lessons";
            isAnyError=true;
          }
        }
      }


      if(this.price==null || !paymentValidation.isValidCash(this.price)){
        this.errorPrice = "Insert Valid Amount";
        isAnyError=true;
      }

      if(this.description==null || this.description==' '){
        this.errorDescription="Description is mandatory";
        isAnyError=true;
      }

      if(this.studentBasicPayment==null || this.studentBasicPayment>100 || this.studentBasicPayment<=0){
        this.errorStudentBasicPayment="Insert valid Percenetage";
        isAnyError=true;
      }

      if(!isAnyError){
        let packageData = new PackageModel(-1,this.title,this.description,0,this.price,1,this.manualLesson,this.autoLesson,this.studentBasicPayment,this.selectVehicleCategory);
        this.showSpinner=true;
        let isPackageSaveCompoleted=false;

        this.packageService.registerPackage(packageData).subscribe(
          response => {
            
            if(this.isSelectFile){//upload the image
                    
                    this.fileUploadService.fileUpload(this.selectedFiles.item(0),response.packageId,3).subscribe(
                      response => {
                        if(response == 0){
                          this.errorMessage="There is a problem with file size.File size should be less than 9MB";
                        }else if(response==1){
                          this.showSpinner=false;
                          this.router.navigate(['package-list']);
                          //change inform to notificationSerivce
                          let data = new WebSocketCommunicationDataMap([0,0,0,0,1]);
                          this.notificationService.notifyChange(data); 
                          
                          Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Package Registration Successfulled.',
                            showConfirmButton: false,
                            timer: 3000
                          });
                        }else{
                          // this.showSpinner=false;
                          // Swal.fire({
                          //   position: 'center',
                          //   type: 'info',
                          //   title: 'Package Registration Successfulled.(Image Not successfully saved)',
                          //   showConfirmButton: false,
                          //   timer: 3000
                          // });   
                        }

                        this.selectedFiles = undefined;
                      },
                      error => {
                        this.showSpinner=false;
                        console.log(error);
                        this.router.navigate(['package-list']);
                        //change inform to notificationSerivce
                        let data = new WebSocketCommunicationDataMap([0,0,0,0,1]);
                        this.notificationService.notifyChange(data); 

                        Swal.fire({
                          position: 'center',
                          type: 'info',
                          title: 'Package Registration Successfulled.(Image Not successfully saved)',
                          showConfirmButton: false,
                          timer: 3000
                        });
                      }
                    );
            }else{
              this.showSpinner=false;
              this.router.navigate(['package-list']);
              //change inform to notificationSerivce
              let data = new WebSocketCommunicationDataMap([0,0,0,0,1]);
              this.notificationService.notifyChange(data); 

              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Package Registration Successfulled.',
                showConfirmButton: false,
                timer: 3000
              });
            }
          },
          error => {
            this.showSpinner=false;
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Package registration not successfulled.',
              showConfirmButton: false,
              timer: 3000
            });
            this.handleErrorResponse(error);
          }
        );

      }
  }


  selectFile(event) {   
    this.isSelectFile=true;
    this.selectedFiles = event.target.files;
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }


}
