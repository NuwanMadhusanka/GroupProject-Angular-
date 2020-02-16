import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageServiceService } from '../../service/package/package-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { StudentServiceService } from '../../service/student/student-service.service';
import Swal from 'sweetalert2';
import { PackageModel } from '../../ClassModel/PackageModel';
import { HttpError } from '../../Shared/httpError/HttpError';

//Store Student selected package details
export class StudentPackage{
  constructor(
  public packageId:Number,
  public transmission:Number
){}
}

@Component({
  selector: 'app-student-package-add',
  templateUrl: './student-package-add.component.html',
  styleUrls: ['./student-package-add.component.scss']
})
export class StudentPackageAddComponent implements OnInit {

  studentId:Number;//get student id by the
  studentName:string;
  errorMessage:String;
  
  packages: PackageModel[] = [];//get package List

  //student packageId store
  list: [];//store student following packageId
  studentPackages:PackageModel[]=[];//store student following packages

  selectPackageId;
  isSelectPackageHasTransmission;
  isAutoLesson;
  isManualLesson;
  isBothLesson;
  selectPackage:PackageModel;
  selectTransmissionType=1;

  constructor(
    private route:ActivatedRoute,
    private packageService:PackageServiceService,
    private studentService:StudentServiceService
  ) {}


  ngOnInit() {
    this.studentId=this.route.snapshot.params['id'];//get student id by url
    this.studentName=this.route.snapshot.params['name'];
    this.packageList();
  }

  
  //Use to select the package transmission type
  packageTransmission(packageId){
      this.isBothLesson=false;
      this.isAutoLesson=false;
      this.isManualLesson=false;

      this.selectPackageId=packageId;
      
      this.packages.forEach(element => {
        if(element.packageId===packageId){
          this.selectPackage=element;
          this.isSelectPackageHasTransmission=true;
          if(element.autoLes != null && element.autoLes>0){
              this.isAutoLesson=true;
              if(element.manualLes !=null && element.manualLes>0){
                this.isBothLesson=true;
                this.isAutoLesson=false;
              }
          }else{
            this.isManualLesson=true;
          }
        }
      });
  }

  //Add new Package to student
  confirmPackageAdd(transmission){
      
      let studentPackageSelected;
      if(transmission === 1)  studentPackageSelected =new StudentPackage(this.selectPackage.packageId,this.selectTransmissionType);
      if(transmission === 2)  studentPackageSelected =new StudentPackage(this.selectPackage.packageId,1);
      if(transmission === 3)  studentPackageSelected =new StudentPackage(this.selectPackage.packageId,2);

      
      //Insert student package details to the db
      this.studentService.studentPackegeAdd(studentPackageSelected,this.studentId).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Save Completed',
            showConfirmButton: false,
            timer: 3000
          });
          this.isSelectPackageHasTransmission=false;
          this.studentPackages=[];
          this.studentPackageList();
          
        },
        error =>{
          //console.log(error);
          this.handleErrorResponse(error);
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Save not completed!',
            showConfirmButton: false,
            timer: 3000
          });
        }
      )
  }

  //get package details
  packageList(){
    this.packageService.packageList().subscribe(
      response => {
        this.packages=response;
        this.studentPackageList();
        },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  //studentFollow Packages
  studentPackageList(){
      
    //get Student following packages Id
    this.studentService.studentPackagesId(this.studentId).subscribe(
      response => {
          this.list=response;
           
          this.list.forEach(element1 => {

              this.packages.forEach(element2 => {
                if(element2.packageId===element1){
                  this.studentPackages.push(element2);
                }
              });

          });
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
  }

  //selectTransmission
  selectTransmission(selectTransmission){
    this.selectTransmissionType=selectTransmission;
  }

  //close 
  close(){
    this.isSelectPackageHasTransmission=false;
  }


  //delete package specific student
  deletePackage(packageId,title){
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert payment details relevant to this "+title+" package of the student!",
      text:"Remove "+title+" package",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //delete confiirm
        //call to API to delete the relevant package of the student follow
        this.studentService.studentPackageDelete(this.studentId,packageId).subscribe(
          response => {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: title+' package deleted.',
              showConfirmButton: false,
              timer: 3000
            });

            //refresh the student packages
            this.studentPackages=[];
            this.studentPackageList();
          }, 
          error =>{

            console.log(error);
            this.handleErrorResponse(error);

            Swal.fire({
              position: 'center',
              type: 'error',
              title: title+' package not deleted.',
              showConfirmButton: false,
              timer: 3500
            });
   
          }
        )
      }
    })
  }


  handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  };
  
}
