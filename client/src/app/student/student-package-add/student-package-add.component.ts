import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageServiceService } from '../../service/package/package-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { FormControl, FormArray, FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { StudentServiceService } from '../../service/student/student-service.service';
import Swal from 'sweetalert2';
import { PackageModel } from '../../ClassModel/PackageModel';

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
  errorMessage:String;
  successMessage:String;
  
  //When new package add to student
  selectedPackage:StudentPackage[]=[];
  object;
  form: FormGroup;
  

  //get package List
  packages: PackageModel[] = [];

  //student packageId store
  list: [];//store student following packageId
  studentPackages:PackageModel[]=[];//store student following packages



  constructor(
    private route:ActivatedRoute,
    private packageService:PackageServiceService,
    private fromBuilder:FormBuilder,
    private studentService:StudentServiceService
  ) {
    this.form = this.fromBuilder.group({
      packageFormArray: new FormArray([],minSelectedCheckboxes(1)),
    });

    this.addCheckboxes();
  }


  private addCheckboxes() {
    this.packages.map((o, i) => {
      //console.log("o"+o+" i:"+i);
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.packageFormArray as FormArray).push(control);
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.packageFormArray
      .map((v, i) => v ? this.packages[i].packageId : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

  

  ngOnInit() {
    this.studentId=this.route.snapshot.params['id'];//get student id by url
    //console.log("Package"+this.studentId)
    this.packageList();
    this.studentPackageList();
  }

  addPackage(){
    console.log("addpackage");
      

      this.selectedPackage.push(new StudentPackage(1,1))
      this.selectedPackage.push(new StudentPackage(2,1))

      //pass this object to the api
      this.object={
        "studentPackageMap":this.selectedPackage
      }
      
      //Insert student package details to the db
      this.studentService.studentPackegeAdd(this.object,this.studentId).subscribe(
        response => {
            var result:String=response;
            if(result==="ok"){
              console.log("ok")
              
            }
        },
        error =>{
          console.log(error);
          this.handleErrorResponse(error);
        }
      )

      this.selectedPackage=[];
  }

  //get package details
  packageList(){
    this.packageService.packageList().subscribe(
      response => {
        //onsole.log(response);
        this.packages=response;
        console.log(this.packages)
        },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )
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

  //delete package specific student
  deletePackage(packageId,title){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert payment details relevant to this "+title+" package of the student!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //delete confiirm
        //call to API to delete the relevant package of the student follow
        this.studentService.studentPackegeDelete(this.studentId,packageId).subscribe(
          response => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            console.log("Hello")
            //refresh the student packages
            this.studentPackages=[];
            this.studentPackageList();
          }, 
          error =>{

            console.log(error);
            this.handleErrorResponse(error);

            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: ''+this.errorMessage
            })

            
          }
        )
      }
    })
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage="Not successful request";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorMessage="Check the Network Connection"
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  

}



function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}