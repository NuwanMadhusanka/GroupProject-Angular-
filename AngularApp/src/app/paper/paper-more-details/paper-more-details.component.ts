import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../ClassModel/StudentModel';
import { ActivatedRoute } from '@angular/router';
import { PaperServiceService } from '../../service/paper/paper-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaperModel } from '../../ClassModel/PaperModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { UserModel } from '../../ClassModel/UserModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';

import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
//import { PaperJsViewerModule } from 'ng2-paperjs-viewer';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-paper-more-details',
  templateUrl: './paper-more-details.component.html',
  styleUrls: ['./paper-more-details.component.scss']
})
export class PaperMoreDetailsComponent implements OnInit {
  paperId;
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
  paperUpdatedinMemory = false;
  // adminStaff;
  adminStaffId;
  userId;
  systemDate;

  errorMessage;
  errorUpdateMessage = "";
  httpError = new HttpError();
  apiUrl = API_URL;

  selectedFiles;
  showSpinner = false;
  downloadedPaper;

  userValidation = new UserValidation();
  user: UserModel = new UserModel(0, '', '', '', '', '', '', '', new Date(), 0, 0, 0);
  staff: StaffModel = new StaffModel(1, this.user);
  adminStaff: AdminStaffModel = new AdminStaffModel(1, 'q', 1, this.staff);
  paperData: PaperModel = new PaperModel(0, 'q', this.adminStaff, new Date());
  //paperData:PaperModel=new PaperModel(1,'','','',new AdminStaffModel());
  //studentData:StudentModel=new StudentModel(1,'Nuwan','0773015590','980150429v',new Date(),new Date(),'No 20 Homagama',new UserModel(1,'nuwan@gmail.com','1234',new Date(),1,1));
  paperSrc: string = '/paper-test.paper';
  constructor(

    // private router: Router,
    private route: ActivatedRoute,
    private paperService: PaperServiceService,
    private adminStaffService: AdminStaffServiceService,
    private fileUploadService: FileUploadServiceService,

  ) { }

  ngOnInit() {
    console.log("in paperMOREcomTS ngOnIt");
    this.paperId = this.route.snapshot.params['id'];//get paper id by url
    this.paperDetails();
    this.userId = sessionStorage.getItem("userId");
    //this.setAdminStaffAndAdminStaffId();
  }

  //get Paper Details from the API
  paperDetails() {
    console.log("in paperMOREcomTS1");
    this.paperService.getPaperbyID(this.paperId).subscribe(
      response => {
        this.paperData = response;
        console.log("in paperlistMoRETS2");
        console.log(this.paperData);
        // this.loadPaper();
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

  }

  isUpdate(option) {
    console.log(this.paperData);
    this.errorUpdateMessage = "";
    console.log(option);    //sjould implement them 
    //if ((option === 2)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Description"; this.updateName = "Description"; this.updateVariable = this.paperData.description; }
    if ((option === 3)) { this.isUpdateResource = true; this.selectOption = option; this.placeHolder = "New Resource"; this.updateName = "Resource"; this.updateVariable = this.filetoUpdate; }
    if ((option === 1)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Title"; this.updateName = "Title"; this.updateVariable = this.paperData.title; }

  }

  update() {
    this.setAdminStaffAndAdminStaffId();
    //description 

   /* if (this.selectOption == 2) {
      console.log("inUpdate in description");
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert Description";
      } else {
        this.paperData.description = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
        console.log("inUpdate in description data set");
      }
    }*/


    //resource
    if (this.selectOption == 3) {
      if ((this.updateVariable == null)) {
        this.errorUpdateMessage = "You must insert Resource.";
      } else {
        this.paperData.adminStaffId = this.adminStaff;
        var datePipe = new DatePipe('en-US');
        this.systemDate = new Date();
        this.paperData.addedDate = this.systemDate;
        console.log(this.paperData.adminStaffId);
        this.errorUpdateMessage = "";
        this.isUpdateResource = false;
        this.confirmResourceUpdate = true;
        this.confirmUpdate = true;
      }
    }

    //title
    if (this.selectOption == 1) {

      this.paperData.title = this.updateVariable;
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

      this.fileUploadService.fileUpload(this.selectedFiles.item(0), this.paperId, 2).subscribe(
        response => {
          console.log("Uploading new File");
          if (response == 0) {
            this.errorMessage = "File size should be less than 9MB";
            return; // should stop updating paper data
          } else if (response == 1) {  //paper overwritten in 3s  //should continue updating "resource" relavant data
           
          } else { //null return 
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Error updating paper data.',
              showConfirmButton: false,
              timer: 1500
            });
          }
          this.showSpinner = false;
          this.selectedFiles = undefined;
          return; // should stop updating paper data
        },
        error => { //errors //shouldchange
          this.showSpinner = false;
          this.selectedFiles = undefined;
          //console.log("Error saving file so Im deleting"+this.savedPaperDetails.paperId);
          //this.paperService.deletePaper(this.savedPaperDetails.paperId).subscribe()
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error updating paper data.',
            showConfirmButton: false,
            timer: 1500
          });
          return; // should stop updating paper data
        }
      );

    }

    //Save Update data(API)
    this.paperService.updatePaper(this.paperData).subscribe(

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
        this.paperData = response;

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

  loadPaper() { //method to load paper //ERROR
    console.log(this.paperId);
    this.fileUploadService.downLoadPaper(this.paperId).subscribe(
      response => {
        console.log(response);
        this.selectedFiles = response;
        //var file = new File(response);
        // window.open(this.downloadedPaper);
        if (response == null) {
          console.log("Nothing Downloaded");
        }
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
  //upload paper
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

  //error handling
  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = this.httpError.ErrorResponse(error);
    //console.log(this.errorMessage);
  };

  closeError() {
    this.errorMessage = null;
  }
}
