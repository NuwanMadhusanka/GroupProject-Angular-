import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaperServiceService } from '../../service/paper/paper-service.service';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { UserModel } from '../../ClassModel/UserModel';
import { PaperModel } from '../../ClassModel/PaperModel';
import { HttpError } from '../../Shared/httpError/HttpError';
//import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';
///import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-paper-add',
  templateUrl: './paper-add.component.html',
  styleUrls: ['./paper-add.component.scss']
})
export class PaperAddComponent implements OnInit {

  //form variables
  paperId: Number = -1;
  description: String = "";
  title: String = "";
  adminStaff;
  adminStaffId: Number = -1;
  addedDate: Date = null;
  systemDate: Date = null;
  noOfQuestions = -1;
  noOfAnswers = -1;
  //addedDate:Date=formatDate(new Date(), 'yyyy/MM/dd', 'en');
  userId;
  savedPaperDetails: PaperModel;

  //form error messages variables
  errorPaperId;
  errorDescription;
  errorTitle;
  errorAdminStaffId;
  errorAddedDate;
  errorSelectedFile;
  errorNoOfQuestions;
  errorNoOfAnswers;

  errorMessage: String;
  regexp: any;//Regular Expression for NIC
  test: boolean;//Regular exprssion result

  selectedFiles;
  showSpinner = false;
  deletePaperFlag = false;
  questionCount: number[] = [];
  answerCount: number[] = [];
  answers: number[] = [];
  num = 0;
  //user Validation Instance
  //userValidation = new UserValidation();

  constructor(
    private router: Router,
    private adminStaffService: AdminStaffServiceService,
    private paperService: PaperServiceService,
    private fileUploadService: FileUploadServiceService,

    //private studentService:StudentServiceService
  ) { }

  ngOnInit() {
    console.log("In paperadd new Compo ts OnIt");
    this.userId = sessionStorage.getItem("userId");
    console.log("UserId in onit PDf Add" + this.userId);
    // this.papers=[];
    for (var i = 1; i < 11; i++) {
      this.questionCount.push(i);
    }
    for (var i = 1; i < 5; i++) {
      this.answerCount.push(i);
    }
    for (var i = 1; i < 11; i++) {
      this.answers.push(0);
    }
    this.setAdminStaffAndAdminStaffId();

  }

  setAdminStaffAndAdminStaffId() {
    console.log("In paperadd set AdminStaff ID");
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

  addPaper() {
    console.log("In paperadd method in addnewPaperTs with submit");
    var datePipe = new DatePipe('en-US');
    this.addedDate = new Date();
    this.errorTitle = "";
    this.errorAdminStaffId = "";
    this.errorAddedDate = "";
    this.errorSelectedFile = "";
    this.errorNoOfAnswers = "";
    this.errorNoOfQuestions = "";


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

    //check if file is selected
    if (this.selectedFiles == null) {
      console.log("Error file");
      this.errorSelectedFile = "Paper file is mandatory";
    }

    //validate no of questions
    if (this.noOfQuestions == -1) {
      console.log("Error noOfQuest");
      this.errorNoOfQuestions = "No of questions is mandatory";
    }

     //validate no of answers per question
    if (this.noOfQuestions == -1) {
      console.log("Error noOfAns");
      this.errorNoOfAnswers = "No of answers is mandatory";
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
       if (this.errorNoOfAnswers != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorNoOfAnswers,
        showConfirmButton: false,
        timer: 1500
      });
    }
       if (this.errorNoOfQuestions != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorNoOfQuestions,
        showConfirmButton: false,
        timer: 1500
      });
    }

    if (this.errorTitle == "" && this.errorAddedDate == "" && this.errorAdminStaffId == "" && this.errorSelectedFile == "" && this.errorNoOfAnswers == "" && this.errorNoOfQuestions == "") {

      this.paperService.addPaper(new PaperModel(-1, this.title, this.adminStaff, this.addedDate, this.noOfQuestions, this.noOfAnswers)).subscribe(
        response => {
          this.savedPaperDetails = response;
          console.log("Paper adding response came");
          console.log(response);
          /* console.log(response);
           Swal.fire({
             position: 'top-end',
             type: 'success',
             title: 'Paper Successfuly saved.',
             showConfirmButton: false,
             timer: 2000
           });
           this.router.navigate(['paper-list'])*/
          //this.savedPaperDetails=response;
          this.fileUploadService.fileUpload(this.selectedFiles.item(0), this.savedPaperDetails.paperId, 3).subscribe(
            response => {
              console.log("In file uploading");
              if (response == 0) {
                this.errorMessage = "File size should be less than 9MB";
              } else if (response == 1) {
                window.location.reload();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  text: 'Paper Saved Successfuly.',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['paper-add'])
              } else { //null return
                Swal.fire({
                  position: 'center',
                  type: 'error',
                  title: 'Error saving paper.',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.deletePaperFlag = true;
              }
              this.showSpinner = false;
              this.selectedFiles = undefined;
            },
            error => { //errors
              this.showSpinner = false;
              this.selectedFiles = undefined;
              //console.log("Error saving file so Im deleting"+this.savedPaperDetails.paperId);
              //this.paperService.deletePaper(this.savedPaperDetails.paperId).subscribe()
              Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Error saving paper.',
                showConfirmButton: false,
                timer: 1500
              });
              this.deletePaperFlag = true;
            }
          );
          if (this.deletePaperFlag == true) {
            this.paperService.deletePaper(this.savedPaperDetails.paperId).subscribe(
              response => {
              },
              error => {
                Swal.fire({
                  position: 'center',
                  type: 'error',
                  title: 'Please deleted ' + this.savedPaperDetails.title + 'paper data',
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
            title: 'Error saving paper.',
            showConfirmButton: false,
            timer: 1500
          });//
          this.handleErrorResponse(error);
        }
      )
    }
  }

  //upload paper
  selectFile(event) {
    this.showSpinner = true;
    this.selectedFiles = event.target.files;
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

  getAnswers(event) {
    if (event.target.checked) {
      console.log('checked: ' + event.target.name + 'Quest');
      console.log('checked: ' + event.target.value + 'Value');
      this.answers[event.target.name - 1] = event.target.value; // set the checked answer for the question
    }
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
