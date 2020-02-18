import { Component, OnInit } from '@angular/core';
//import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { Router, ActivatedRoute } from '@angular/router';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { InstructorModel } from '../../ClassModel/InstructorModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { UserModel } from '../../ClassModel/UserModel';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';

@Component({
  selector: 'app-instructor-assign',
  templateUrl: './instructor-assign.component.html',
  styleUrls: ['./instructor-assign.component.scss']
})
export class InstructorAssignComponent implements OnInit {


  vehicleId;
  errorMessage;
  httpError = new HttpError();

  user : UserModel = new UserModel (1, '','','','','','','',new Date(),1,1,1);
  staff: StaffModel = new StaffModel(1, this.user);
  instructorData:InstructorModel = new InstructorModel(1,'q', this.staff);
  vehicleCategory: VehicleCategoryModel = new VehicleCategoryModel(1, 'q', 1);
  vehicleData: VehicleModel = new VehicleModel(1, 'q ', 'q ', 1,1,' q',this.instructorData,1,' q', this.vehicleCategory);


  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorServiceService,
    private vehicleService: VehicleServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
    console.log("In InstructorDetails ts");
    console.log(this.vehicleData.vehicleId);
    console.log(this.vehicleData.instructorId);
    this.InstructorDetails(this.vehicleId) 
  }


  

  InstructorDetails(vehicleId) {

    this.vehicleService.getInstructorbyVehicleID(vehicleId).subscribe(
      response => {
        console.log("In vInstructorDetails success");
        console.log(this.vehicleId);
        this.instructorData = response;
        console.log(this.instructorData);
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
