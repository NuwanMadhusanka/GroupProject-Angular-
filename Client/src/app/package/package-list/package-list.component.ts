import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageServiceService } from '../../service/package/package-service.service';
import { PackageModel } from '../../ClassModel/PackageModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {

  packageList:PackageModel[]=[];

  constructor(
    private router :Router,
    private packageService : PackageServiceService
  ) { }

  ngOnInit() {
    this.getPackageList();
  }

  getPackageList(){
    this.packageService.packageList().subscribe(
      response => {
        this.packageList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  addPackage(){
    this.router.navigate(['package-add']);
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
