import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../ClassModel/StudentModel';
import { ActivatedRoute } from '@angular/router';
import { VideoServiceService } from '../../service/video/video-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoModel } from '../../ClassModel/VideoModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { UserModel } from '../../ClassModel/UserModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';

import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
//import { VideoJsViewerModule } from 'ng2-videojs-viewer';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-video-more-details',
  templateUrl: './video-more-details.component.html',
  styleUrls: ['./video-more-details.component.scss']
})
export class VideoMoreDetailsComponent implements OnInit {
  videoId;
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
  videoUpdatedinMemory = false;
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
  downloadedVideo;

  userValidation = new UserValidation();
  user: UserModel = new UserModel(0, '', '', '', '', '', '', '', new Date(), 0, 0, 0);
  staff: StaffModel = new StaffModel(1, this.user);
  adminStaff: AdminStaffModel = new AdminStaffModel(1, 'q', 1, this.staff);
  videoData: VideoModel = new VideoModel(0, 'q', 'q', this.adminStaff, new Date());
  //videoData:VideoModel=new VideoModel(1,'','','',new AdminStaffModel());
  //studentData:StudentModel=new StudentModel(1,'Nuwan','0773015590','980150429v',new Date(),new Date(),'No 20 Homagama',new UserModel(1,'nuwan@gmail.com','1234',new Date(),1,1));
  videoSrc: string = '/video-test.video';
  constructor(

    // private router: Router,
    private route: ActivatedRoute,
    private videoService: VideoServiceService,
    private adminStaffService: AdminStaffServiceService,
    private fileUploadService: FileUploadServiceService,

  ) { }

  ngOnInit() {
    console.log("in videoMOREcomTS ngOnIt");
    this.videoId = this.route.snapshot.params['id'];//get video id by url
    this.videoDetails();
    this.userId = sessionStorage.getItem("userId");
    //this.setAdminStaffAndAdminStaffId();
  }

  //get Video Details from the API
  videoDetails() {
    console.log("in videoMOREcomTS1");
    this.videoService.getVideobyID(this.videoId).subscribe(
      response => {
        this.videoData = response;
        console.log("in videolistMoRETS2");
        console.log(this.videoData);
        // this.loadVideo();
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

  }

  isUpdate(option) {
    console.log(this.videoData);
    this.errorUpdateMessage = "";
    console.log(option);    //sjould implement them 
    if ((option === 2)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Description"; this.updateName = "Description"; this.updateVariable = this.videoData.description; }
    if ((option === 3)) { this.isUpdateResource = true; this.selectOption = option; this.placeHolder = "New Resource"; this.updateName = "Resource"; this.updateVariable = this.filetoUpdate; }
    if ((option === 1)) { this.isUpdateVariable = true; this.selectOption = option; this.placeHolder = "New Title"; this.updateName = "Title"; this.updateVariable = this.videoData.title; }

  }

  update() {
    this.setAdminStaffAndAdminStaffId();
    //description 

    if (this.selectOption == 2) {
      console.log("inUpdate in description");
      if (this.updateVariable == "") {
        this.errorUpdateMessage = "You must insert Description";
      } else {
        this.videoData.description = this.updateVariable;
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
        this.videoData.adminStaffId = this.adminStaff;
        var datePipe = new DatePipe('en-US');
        this.systemDate = new Date();
        this.videoData.addedDate = this.systemDate;
        console.log(this.videoData.adminStaffId);
        this.errorUpdateMessage = "";
        this.isUpdateResource = false;
        this.confirmResourceUpdate = true;
        this.confirmUpdate = true;
      }
    }

    //title
    if (this.selectOption == 1) {

      this.videoData.title = this.updateVariable;
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

      this.fileUploadService.fileUpload(this.selectedFiles.item(0), this.videoId, 2).subscribe(
        response => {
          console.log("Uploading new File");
          if (response == 0) {
            this.errorMessage = "File size should be less than 9MB";
            return; // should stop updating video data
          } else if (response == 1) {  //video overwritten in 3s  //should continue updating "resource" relavant data
           
          } else { //null return 
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Error updating video data.',
              showConfirmButton: false,
              timer: 1500
            });
          }
          this.showSpinner = false;
          this.selectedFiles = undefined;
          return; // should stop updating video data
        },
        error => { //errors //shouldchange
          this.showSpinner = false;
          this.selectedFiles = undefined;
          //console.log("Error saving file so Im deleting"+this.savedVideoDetails.videoId);
          //this.videoService.deleteVideo(this.savedVideoDetails.videoId).subscribe()
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error updating video data.',
            showConfirmButton: false,
            timer: 1500
          });
          return; // should stop updating video data
        }
      );

    }

    //Save Update data(API)
    this.videoService.updateVideo(this.videoData).subscribe(

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
        this.videoData = response;

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

  loadVideo() { //method to load video //ERROR
    this.fileUploadService.downLoadVideo(this.videoId).subscribe(
      response => {
        console.log(response);
        this.selectedFiles = response;
        //var file = new File(response);
        // window.open(this.downloadedVideo);
        if (response == null) {
          console.log("Nothing Downloaded");
        }
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
  //upload video
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
