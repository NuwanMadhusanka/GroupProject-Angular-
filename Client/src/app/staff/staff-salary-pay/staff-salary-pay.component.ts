import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryModel } from '../../ClassModel/SalaryModel';
import { StaffServiceService } from '../../service/StaffService/staff-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';
import { PaymentValidation } from '../../Shared/validation/payment-validation/payment-validation';
import { StaffWorkDaysDataMap } from '../../ClassModel/MapObject/StaffWorkDaysDataMap';
import { SalaryInformationModel } from '../../ClassModel/SalaryInformationModel';
import { StaffModel } from '../../ClassModel/StaffModel';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');



@Component({
  selector: 'app-staff-salary-pay',
  templateUrl: './staff-salary-pay.component.html',
  styleUrls: ['./staff-salary-pay.component.scss']
})
export class StaffSalaryPayComponent implements OnInit {
  monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

  staffId:Number;
  staffMemberRole:String;
  staffWorkDays:StaffWorkDaysDataMap=new StaffWorkDaysDataMap(0,0,0,0,0);
  staffSalaryData:SalaryModel;
  isStaffSalaryDataLoad=false;
  staffMemberName:String="";
  netSalary:number=0;
  month:number;
  year:number;

  staffSalaryInformation:SalaryInformationModel;
  isStaffSalaryInformationLoad=false;

  isSelectPay=false;
  selectPay=0;
  payment:number;
  paymentValidation = new PaymentValidation();
  errorPayment="";


  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private staffService:StaffServiceService
  ) { }

  ngOnInit() {
    this.staffId=this.route.snapshot.params['id'];//get staff id by url
    this.month=this.route.snapshot.params['month'];//get month id by url
    this.year=this.route.snapshot.params['year'];//get year by url
    if(+sessionStorage.getItem('userRole')!=1){
        this.router.navigate(['/']);
    }
    this.getStaffSalaryData();
    this.getStaffSalaryInformation();
  }

  selectPayFunction(){
    if(this.selectPay==0){
      this.selectPay=1;
      this.isSelectPay=true;
    }else{
      this.selectPay=0;
      this.isSelectPay=false;
    }
  }

  getStaffSalaryData(){
    this.staffService.getStaffSalaryData(this.staffId,this.month,this.year).subscribe(
      response => {
        this.staffSalaryData=response;
        this.staffMemberName=this.staffSalaryData.staffId.userId.firstName+' '+this.staffSalaryData.staffId.userId.lastName;
        this.netSalary = this.staffSalaryData.totalPayment-this.staffSalaryData.nopay-this.staffSalaryData.payed;
        this.getStaffWorkDays();
        this.getStaffMemberRole(this.staffSalaryData.staffId);
        this.isStaffSalaryDataLoad=true;
      },
      error =>{
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  validPayment(){
    this.errorPayment="";
    
    if(this.paymentValidation.isValidCash(this.payment)){
      if(this.payment<=this.netSalary){
        this.payStaffSalary(this.payment);
      }else{
        this.errorPayment="Payment should be less than netsalary";   
      }
    }else{
        this.errorPayment="Insert valid payment";
    }
  }

  payStaffSalary(payment:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You will pay Rs:"+payment+" for "+this.staffSalaryData.staffId.userId.firstName+" "+this.staffSalaryData.staffId.userId.lastName,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay!'
    }).then((result) => {
      if(result.value){
        let staffSalaryObject = new SalaryModel(this.staffSalaryData.salaryId,this.staffSalaryData.month,this.year,this.staffSalaryData.totalPayment,this.staffSalaryData.payed,this.staffSalaryData.nopay,this.staffSalaryData.complete,null,this.staffSalaryData.staffId);
        staffSalaryObject.payed = this.staffSalaryData.payed+payment;
        this.staffService.payStaffSalary(staffSalaryObject).subscribe(
          response => {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Payment Successed.',
              showConfirmButton: false,
              timer: 2000
            });
            this.payment=0;
            this.errorPayment="";
            this.getStaffSalaryData();
          },
          error => {
            console.log(error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Payment not successed.',
              showConfirmButton: false,
              timer: 3000
            });
            this.handleErrorResponse(error);
          }
        );
      }
    });
  }

  getStaffWorkDays(){
    this.staffService.getStaffWorkDays(this.staffSalaryData.staffId.staffId,this.month,this.year).subscribe(
      response => {
        this.staffWorkDays = response;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getStaffSalaryInformation(){
    this.staffService.getStaffRoleSalaryInformation(this.staffId,this.year,this.month).subscribe(
      response => {
        this.staffSalaryInformation=response;
        this.isStaffSalaryInformationLoad=true;
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  getStaffMemberRole(staff:StaffModel){
    let role = staff.userId.role;
    if(role==2){
      this.staffMemberRole="Administrative Staff-Student Serviceman";
    }else if(role==3){
      this.staffMemberRole="Administrative Staff-Instructor Serviceman";
    }else{
      this.staffMemberRole="Instructor Serviceman";
    }
  }


  generatePdf(title){

    var doc = new jsPDF('p','pt');

    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');//page Border
    doc.setFontType("bold");
 
    
    var res = doc.autoTableHtmlToJson(document.getElementById("salartReport"));
    
    var today = new Date();
    var year=today.getFullYear();
    var month=today.getMonth();
    var date=today.getDate();
    var header = function(data) {
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text(title, data.settings.margin.left, 70);
    };
  
    var options = {
      beforePageContent: header,
      margin: {
        top: 80
      },
      startY: doc.autoTableEndPosY() + 90
    };
    
    doc.autoTable(res.columns, res.data, options);
    let saveFileName= this.staffMemberName+"("+month+")"+".pdf";
    doc.save(saveFileName);
  }

  handleErrorResponse(error: HttpErrorResponse) {
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

}
