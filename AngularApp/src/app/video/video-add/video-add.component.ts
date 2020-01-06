import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoServiceService } from '../../service/video/video-service.service';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { UserModel } from '../../ClassModel/UserModel';
import { VideoModel } from '../../ClassModel/VideoModel';
import { HttpError } from '../../Shared/httpError/HttpError';
//import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';


@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.scss']
})
export class VideoAddComponent implements OnInit {

  //form variables
  videoId: Number = -1;
  description: String = "";
  title: String = "";
  adminStaff;
  adminStaffId: Number = -1;
  addedDate: Date = null;
  systemDate: Date = null;
  //addedDate:Date=formatDate(new Date(), 'yyyy/MM/dd', 'en');
  userId;
  savedVideoDetails: VideoModel;

  //form error messages variables
  errorVideoId;
  errorDescription;
  errorTitle;
  errorAdminStaffId;
  errorAddedDate;
  errorSelectedFile;

  errorMessage: String;
  regexp: any;//Regular Expression for NIC
  test: boolean;//Regular exprssion result

  selectedFiles;
  showSpinner = false;
  deleteVideoFlag = false;

  //idate:Date;

  //user Validation Instance
  //userValidation = new UserValidation();

  constructor(
    private router: Router,
    private adminStaffService: AdminStaffServiceService,
    private videoService: VideoServiceService,
    private fileUploadService: FileUploadServiceService,

    //private studentService:StudentServiceService
  ) { }

  ngOnInit() {
    console.log("In videoadd new Compo ts OnIt");
    this.userId = sessionStorage.getItem("userId");
    console.log("UserId in onit PDf Add" + this.userId);
    this.setAdminStaffAndAdminStaffId();

  }

  setAdminStaffAndAdminStaffId() {
    console.log("In videoadd set AdminStaff ID");
    this.adminStaffService.getAdminStaffFromUserID(this.userId).subscribe(
      response => {
        this.adminStaff = response;
        this.adminStaffId = response.adminStaffId;
        console.log("in sub");
        console.log(this.adminStaffId);
        console.log("p0");
      },
      error => {
        console.log("error getting admin stf id");
        console.log(error);
        this.handleErrorResponse(error);

      }
    )
  }

  addVideo() {
    console.log("In videoadd method in addnewVideoTs with submit");
    var datePipe = new DatePipe('en-US');
    this.addedDate = new Date();
    this.errorTitle = "";
    this.errorAdminStaffId = "";
    this.errorAddedDate = "";
    this.errorSelectedFile = "";


    //validate Title
    if (this.title === "") {
      console.log("Empty");
      this.errorTitle = "Title  is mandatory ";
    }

    //valid added date
    if (this.addedDate === null) {
      this.errorAddedDate = "Error in getting system Date "; // error message bit changed
    }

    //validate admin staff id
    if (this.adminStaffId === -1) {
      this.errorAdminStaffId = "Error getting Admin Staff Details";  // should take admin staff id from log in user details
    }

    if (this.selectedFiles == null) {
      console.log("Error file");
      this.errorSelectedFile = "Video file is mandatory";
    }

    //Save to the DB
    // if (this.errorMessage == null) {
    //  console.log(this.errorMessage);
    //  if(this.selectedFiles==null){
    //    console.log("file not selected");
    //  }

    if (this.errorAddedDate != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorAddedDate,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (this.errorAdminStaffId != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorAdminStaffId,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (this.errorSelectedFile != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorSelectedFile,
        showConfirmButton: false,
        timer: 1500
      });
    }

    if (this.errorTitle == "" && this.errorAddedDate == "" && this.errorAdminStaffId == "" && this.errorSelectedFile == "") {

      this.videoService.addVideo(new VideoModel(-1, this.title, this.description, this.adminStaff, this.addedDate)).subscribe(
        response => {
          this.savedVideoDetails = response;
          console.log("Video adding response came");
          console.log(response);
          /* console.log(response);
           Swal.fire({
             position: 'top-end',
             type: 'success',
             title: 'Video Successfuly saved.',
             showConfirmButton: false,
             timer: 2000
           });
           this.router.navigate(['video-list'])*/
          //this.savedVideoDetails=response;
          this.fileUploadService.fileUpload(this.selectedFiles.item(0), this.savedVideoDetails.videoId, 4).subscribe(
            response => {
              console.log("In file uploading");
              if (response == 0) {
                this.errorMessage = "File size should be less than 9MB";
              } else if (response == 1) {
                window.location.reload();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  text: 'Video Saved Successfuly.',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['video-add'])
              } else { //null return
                Swal.fire({
                  position: 'center',
                  type: 'error',
                  title: 'Error saving video.',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.deleteVideoFlag = true;
              }
              this.showSpinner = false;
              this.selectedFiles = undefined;
            },
            error => { //errors
              this.showSpinner = false;
              this.selectedFiles = undefined;
              //console.log("Error saving file so Im deleting"+this.savedVideoDetails.videoId);
              //this.videoService.deleteVideo(this.savedVideoDetails.videoId).subscribe()
              Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Error saving video.',
                showConfirmButton: false,
                timer: 1500
              });
              this.deleteVideoFlag = true;
            }
          );
          if(this.deleteVideoFlag==true){
            this.videoService.deleteVideo(this.savedVideoDetails.videoId).subscribe(
          response => {
          },
          error => {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Please deleted '+this.savedVideoDetails.title+'video data',
              showConfirmButton: false,
              timer: 3000
            });
          }
        )
          }
        },
        error => {
          console.log(error);//
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error saving video.',
            showConfirmButton: false,
            timer: 1500
          });//
          this.handleErrorResponse(error);
        }
      )
    }
  }

  //upload video
  selectFile(event) {
    this.showSpinner = true;
    this.selectedFiles = event.target.files;/*
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

  closeError() {
    this.errorMessage = "";
  }

  handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = "There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  };

}
