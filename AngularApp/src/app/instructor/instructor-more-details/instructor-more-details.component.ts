import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../ClassModel/StudentModel';
import { ActivatedRoute } from '@angular/router';
import { InstructorServiceService } from '../../service/instructor/instructor-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PdfModel } from '../../ClassModel/PdfModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { UserModel } from '../../ClassModel/UserModel';
import { InstructorModel } from '../../ClassModel/InstructorModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';
import { API_URL } from '../../app.constants';


@Component({
  selector: 'app-instructor-more-details',
  templateUrl: './instructor-more-details.component.html',
  styleUrls: ['./instructor-more-details.component.scss']
})
export class InstructorMoreDetailsComponent implements OnInit {
  instructorId;
  isUpdateVariable = false;
  selectOption;//updated variable Name(number)
  updateVariable;
  placeHolder;
  updateName;//update variable Name
  confirmUpdate = false;


  adminStaffId;
  instructorUserId;
  systemDate;
  errorMessage;
  errorUpdateMessage = "";
  encryptedPassword;
  isPasswordChange;
  httpError = new HttpError();

  selectedFiles;
  showSpinner = false;

  userValidation = new UserValidation(); // is this needed ??
  user: UserModel = new UserModel(0, '', '', '', '', '', '', '', new Date(), 0, 0, 0);
  staff: StaffModel = new StaffModel(1, this.user);
  instructorData: InstructorModel = new InstructorModel(0, 'q', this.staff);

  apiUrl = API_URL;

  //pdfSrc: string = '/pdf-test.pdf';
  constructor(

    private route: ActivatedRoute,
    private instructorService: InstructorServiceService,
    private fileUploadService :FileUploadServiceService,
    //private adminStaffService:AdminStaffServiceService,

  ) { }

  ngOnInit() {
    console.log("in Instr MOREcomTS ngOnIt");
    this.instructorId = this.route.snapshot.params['id'];//get instructor id by url
    this.instructorDetails();
    // this.userId=sessionStorage.getItem("userId");
    //this.setAdminStaffAndAdminStaffId();
  }

  //get instructor Details from the API
  instructorDetails() {
    console.log("in instructorMOREcomTS1");
    this.instructorService.getInstructorbyID(this.instructorId).subscribe(
      response => {
        this.instructorData = response;
        console.log("in pdflistMoRETS2");
        console.log(this.instructorData);
        this.instructorUserId=this.instructorData.staffId.userId.userId;
        this.encryptedPassword = this.instructorData.staffId.userId.password;
        this.instructorData.staffId.userId.password = "";
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

  }


  isUpdate(option) {

    this.errorUpdateMessage = "";
    if ((option === 1)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New First Name"; this.updateName = "First Name"; this.updateVariable = this.instructorData.staffId.userId.firstName; }
    if ((option === 2)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Last Name"; this.updateName = "Last Name"; this.updateVariable = this.instructorData.staffId.userId.lastName; }
    if ((option === 3)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New NIC"; this.updateName = "NIC"; this.updateVariable = this.instructorData.staffId.userId.nic; }
    if ((option === 4)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New License"; this.updateName = "License"; this.updateVariable = this.instructorData.licence; }
    if ((option === 5)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Tell No"; this.updateName = "Tell No"; this.updateVariable = this.instructorData.staffId.userId.tel; }
    if ((option === 6)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Address"; this.updateName = "Address"; this.updateVariable = this.instructorData.staffId.userId.address; }
    if ((option === 7)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New E-Mail"; this.updateName = "E-Mail"; this.updateVariable = this.instructorData.staffId.userId.email; }
    if ((option === 8)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Password"; this.updateName = "Password"; this.updateVariable = ""; }

  }

  update() {

    // first name 
    if (this.selectOption == 1) {
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert First Name.";
      } else {
        this.instructorData.staffId.userId.firstName = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

    //last name
    if (this.selectOption == 2) {
      if ((this.updateVariable == "")) {
        this.errorUpdateMessage = "You must insert Last Name.";
      } else {
        this.instructorData.staffId.userId.lastName = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

    //nic
    if (this.selectOption == 3) {
      if ((this.updateVariable == "") || !this.userValidation.isValidNicNumber(this.updateVariable)) {
        this.errorUpdateMessage = "You must insert Valid NIC.";
      } else {
        this.instructorData.staffId.userId.nic = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

    //license
    if (this.selectOption == 4) {
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert Licence.";
      } else {
        this.instructorData.licence = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }
    //tell no
    if (this.selectOption == 5) {
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert Tell No.";
      } else {
        this.instructorData.staffId.userId.tel = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }
    //address 
    if (this.selectOption == 6) {
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert Address.";
      } else {
        this.instructorData.staffId.userId.address = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

    //update email
    if (this.selectOption == 7) {
      if ((this.updateVariable == "") || !this.userValidation.isValidEmail(this.updateVariable)) {
        this.errorUpdateMessage = "You must insert valid E-Mail.";
      } else {
        this.instructorData.staffId.userId.email = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.confirmUpdate = true;
      }
    }

    //update password
    if (this.selectOption == 8) {
      if ((this.updateVariable == "")) {
        this.errorUpdateMessage = "You must insert valid password.";
      } else {
        this.instructorData.staffId.userId.password = this.updateVariable;
        this.errorUpdateMessage = "";
        this.isUpdateVariable = false;
        this.isPasswordChange = true;
        this.confirmUpdate = true;
      }
    }

  }

  close() {
    this.isUpdateVariable = false;
  }

  //save updates
  saveUpdate() {
    //Save Update data(API)
    if (!this.isPasswordChange) {
      this.instructorData.staffId.userId.password = this.encryptedPassword;
      this.isPasswordChange = false;
    }

    this.instructorService.updateInstructor(this.instructorData).subscribe(
      response => {
        this.confirmUpdate = false;
        if (response == 1) {
          //update success
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Update Successful.',
            showConfirmButton: false,
            timer: 1500
          });
        }
        if (response == 2 || response == 3) {
          this.errorMessage = (response == 2 ? "Updated email already exist." : "Updated NIC number already exist");
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Update not Successful.',
            showConfirmButton: false,
            timer: 1500
          });
        }

        this.instructorDetails();
      },
      error => {
        //console.log(error);
        this.handleErrorResponse(error);
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'Update not Successful!',
          showConfirmButton: false,
          timer: 2000
        });
      }

    )
  }

  //upload user image
  selectFile(event) {
    this.showSpinner = true;
    this.selectedFiles = event.target.files;
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
    );
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
