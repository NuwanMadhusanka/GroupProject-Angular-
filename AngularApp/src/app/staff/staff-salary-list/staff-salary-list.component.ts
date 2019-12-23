import { Component, OnInit } from '@angular/core';
import { SalaryModel } from '../../ClassModel/SalaryModel';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import { Router } from '@angular/router';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';


@Component({
  selector: 'app-staff-salary-list',
  templateUrl: './staff-salary-list.component.html',
  styleUrls: ['./staff-salary-list.component.scss']
})
export class StaffSalaryListComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  selectMonth:number;
  currentMonth:number;

  staffSalaryList:SalaryModel[]=[];
  
  errorMessage:String;

  validation:UserValidation = new UserValidation();

  //Filter Option Implement
  filteredStaffSalaryList: SalaryModel[] = [];
  private _searchTerm:string;
  get searchTerm(): string{
    return this._searchTerm;
  }
  set searchTerm(value:string){
    this._searchTerm=value;
    this.filteredStaffSalaryList = this.filterSalary(value);
  }

  filterSalary(searchString:string){
     if(this.validation.isDigitContain(searchString)){
      return this.staffSalaryList.filter(salary => 
        salary.staffId.userId.nic.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1) ;
     }
     return this.staffSalaryList.filter(salary => 
        salary.staffId.userId.firstName.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 || salary.staffId.userId.lastName.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1) ;
  }
  //Finish filter option implementation

  constructor(
    private staffService : StaffServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getCurrentMonth();
    this.getStaffSalaryDetails();
  }
  

  getStaffSalaryDetails(){
    this.staffService.getStaffSalaryDetails(this.selectMonth+1).subscribe(
      response => {
        this.staffSalaryList=response;
        this.filteredStaffSalaryList=response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getCurrentMonth(){
    var date = new Date(); 
    this.currentMonth=date.getMonth();
    this.selectMonth =this.currentMonth; //set current month as default selection
  }

  selectMonths(index:number){
    this.errorMessage="";
    if(index<=this.currentMonth){
      this.selectMonth=index;
      this.getStaffSalaryDetails();
    }else{
      this.errorMessage="Cannot select future months";
    }  
  }

  staffSalaryPay(staffId:Number){
    this.router.navigate(['staff-salary-pay',staffId,this.selectMonth+1]);
  }

  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
