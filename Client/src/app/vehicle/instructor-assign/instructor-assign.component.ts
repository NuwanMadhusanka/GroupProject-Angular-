import { Component, OnInit } from '@angular/core';
//import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { VehicleServiceService } from '../../service/vehicle/vehicle-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-assign',
  templateUrl: './instructor-assign.component.html',
  styleUrls: ['./instructor-assign.component.scss']
})
export class InstructorAssignComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }

}
