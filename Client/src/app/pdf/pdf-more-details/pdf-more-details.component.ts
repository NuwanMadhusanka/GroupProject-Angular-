import { Component, OnInit } from '@angular/core';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { UserModel } from '../../ClassModel/UserModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { PdfModel } from '../../ClassModel/PdfModel';
import { ActivatedRoute } from '@angular/router';
import { PdfServiceService } from '../../service/pdf/pdf-service.service';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';

@Component({
  selector: 'app-pdf-more-details',
  templateUrl: './pdf-more-details.component.html',
  styleUrls: ['./pdf-more-details.component.scss']
})
export class PdfMoreDetailsComponent implements OnInit {

  pdfId;
  isUpdateVariable = false;
  isUpdateResource = false;
  //isResourceNotIncluded = true;
  filetoUpdate;
  selectOption;//updated variable Name(number)
  updateVariable;
  placeHolder;
  updateName;//update variable Name
  confirmUpdate = false;
  confirmResourceUpdate = false;
  pdfUpdatedinMemory = false;
  // adminStaff;
  adminStaffId;
  userId;
  systemDate;
  pdfFile;

  errorMessage;
  errorUpdateMessage = "";
  httpError = new HttpError();
  apiUrl = API_URL;

  selectedFiles;
  showSpinner = false;
  downloadedPdf;

  userValidation = new UserValidation();
  user: UserModel = new UserModel(0, '', '', '', '', '', '', '', new Date(), 0, 0, 0);
  staff: StaffModel = new StaffModel(1, this.user);
  adminStaff: AdminStaffModel = new AdminStaffModel(1, 'q', 1, this.staff);
  pdfData: PdfModel = new PdfModel(0, 'q', 'q', this.adminStaff, new Date());
  //pdfData:PdfModel=new PdfModel(1,'','','',new AdminStaffModel());
  //studentData:StudentModel=new StudentModel(1,'Nuwan','0773015590','980150429v',new Date(),new Date(),'No 20 Homagama',new UserModel(1,'nuwan@gmail.com','1234',new Date(),1,1));
  pdfSrc: string = '/pdf-test.pdf';
  constructor(

    // private router: Router,
    private route: ActivatedRoute,
    private pdfService: PdfServiceService,
    private adminStaffService: AdminStaffServiceService,
    private fileUploadService: FileUploadServiceService,

  ) { }

  ngOnInit() {
    console.log("in pdfMOREcomTS ngOnIt");
    this.pdfId = this.route.snapshot.params['id'];//get pdf id by url
    this.pdfDetails();
    this.userId = sessionStorage.getItem("userId");
    //this.setAdminStaffAndAdminStaffId();
  }

  //get Pdf Details from the API
  pdfDetails() {
    console.log("in pdfMOREcomTS1");
    this.pdfService.getPdfbyID(this.pdfId).subscribe(
      response => {
        this.loadPdf();
        this.pdfData = response;
        console.log("in pdflistMoRETS2");
        console.log(this.pdfData);
        
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

  }

  isUpdate(option) {
    console.log(this.pdfData);
    this.errorUpdateMessage = "";
    console.log(option);    //sjould implement them 
    if ((option === 2)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Description"; this.updateName = "Description"; this.updateVariable = this.pdfData.description; }
    if ((option === 3)) { this.isUpdateResource = true; this.selectOption = option; this.placeHolder = "New Resource"; this.updateName = "Resource"; this.updateVariable = this.filetoUpdate; }
    if ((option === 1)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Title"; this.updateName = "Title"; this.updateVariable = this.pdfData.title; }

  }

  update() {
    this.setAdminStaffAndAdminStaffId();
    //description 

    if (this.selectOption == 2) {
      console.log("inUpdate in description");
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert Description";
      } else {
        this.pdfData.description = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
        console.log("inUpdate in description data set");
      }
    }


    //resource
    if (this.selectOption == 3) {
      if ((this.updateVariable == null)) {
        this.errorUpdateMessage = "You must insert Resource.";
      } else {
        this.pdfData.adminStaffId = this.adminStaff;
        var datePipe = new DatePipe('en-US');
        this.systemDate = new Date();
        this.pdfData.addedDate = this.systemDate;
        console.log(this.pdfData.adminStaffId);
        this.errorUpdateMessage = "";
        this.isUpdateResource = false;
        this.confirmResourceUpdate = true;
        this.confirmUpdate = true;
      }
    }

    //title
    if (this.selectOption == 1) {

      this.pdfData.title = this.updateVariable;
      this.errorUpdateMessage = "";
      this.isUpdateVariable = false;
      this.confirmUpdate = true;

    }

  }



  close() {
    this.isUpdateVariable = false;
  }

  //save updates
  saveUpdate() {

    if (this.confirmResourceUpdate == true) {

      this.fileUploadService.fileUpload(this.selectedFiles.item(0), this.pdfId, 2).subscribe(
        response => {
          console.log("Uploading new File");
          if (response == 0) {
            this.errorMessage = "File size should be less than 9MB";
            return; // should stop updating pdf data
          } else if (response == 1) {  //pdf overwritten in 3s  //should continue updating "resource" relavant data

          } else { //null return 
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Error updating pdf data.',
              showConfirmButton: false,
              timer: 1500
            });
          }
          this.showSpinner = false;
          this.selectedFiles = undefined;
          return; // should stop updating pdf data
        },
        error => { //errors //shouldchange
          this.showSpinner = false;
          this.selectedFiles = undefined;
          //console.log("Error saving file so Im deleting"+this.savedPdfDetails.pdfId);
          //this.pdfService.deletePdf(this.savedPdfDetails.pdfId).subscribe()
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error updating pdf data.',
            showConfirmButton: false,
            timer: 1500
          });
          return; // should stop updating pdf data
        }
      );

    }

    //Save Update data(API)
    this.pdfService.updatePdf(this.pdfData).subscribe(

      response => {
        console.log("In saving Update");
        console.log(response);

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Update Successful.',
          showConfirmButton: false,
          timer: 1500
        });
        this.confirmUpdate = false;
        this.pdfData = response;

      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'Update not Successful.',
          showConfirmButton: false,
          timer: 1500
        });
      }

    )
  }
  setAdminStaffAndAdminStaffId() {
    this.adminStaffService.getAdminStaffFromUserID(this.userId).subscribe(
      response => {
        this.adminStaff = response;
        console.log("Setting adminstaff Id");
        this.adminStaffId = response.adminStaffId;
        console.log("in sub");
        console.log(this.adminStaffId);
        console.log("p0");
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);

      }
    )
  }

  loadPdf() { //method to load pdf //ERROR
    console.log("load pdf meth");
    console.log("pdfId"+this.pdfId);
    this.fileUploadService.downLoadPdf(this.pdfId).subscribe(
      response => {
        console.log(response);
        this.selectedFiles = response;
        this.pdfFile=response;
        console.log(this.pdfFile);
        //var file = new File(response);
        // window.open(this.downloadedPdf);
        if (response != null) {
          console.log("Nothing Downloaded");
        }
      },
      error => {
        console.log("Error in loadPdf");
        this.handleErrorResponse(error);
      }
    )
  }
  //upload pdf
  selectFile(event) {
    this.showSpinner = true;
    this.selectedFiles = event.target.files;
    console.log("files selected");
    this.filetoUpdate = this.selectedFiles.item(0);
    this.updateVariable = this.filetoUpdate;
    console.log(this.filetoUpdate);
    //this.isResourceNotIncluded=false;
    /*
    
   this.fileUploadService.fileUpload(this.selectedFiles.item(0), this.instructorData.staffId.userId.userId, 1).subscribe(
      response => {
        if (response == 0) {
          this.errorMessage = "File size should be less than 9MB";
        } else if (response == 1) {
          window.location.reload();
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Update Successful.',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Update not Successful.',
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.showSpinner = false;
        this.selectedFiles = undefined;
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
   );*/
  }

  //viewPdf
  /*loadList(documentId){
        GoodInStockService.getLoadList(documentId)
            .then(
                function(d){
                    var file = new Blob([d.data], {type: 'application/pdf'});
                    var url = window.URL || window.webkitURL;
                    var fileURL = url.createObjectURL(file);
                    window.open(fileURL);
                },
                function(errResponse){
                    console.error('Error while getting Load list');
                }
            )

    }*/

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = this.httpError.ErrorResponse(error);
    //console.log(this.errorMessage);
  };

  closeError() {
    this.errorMessage = null;
  }

}
