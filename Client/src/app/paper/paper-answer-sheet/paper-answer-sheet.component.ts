import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { StudentServiceService } from '../../service/student/student-service.service';
import { FileUploadServiceService } from '../../service/file-upload/file-upload-service.service';
import { AdminStaffServiceService } from '../../service/adminStaff/admin-staff-service.service';
import { PaperServiceService } from '../../service/paper/paper-service.service';
import { ActivatedRoute } from '@angular/router';
import { PaperModel } from '../../ClassModel/PaperModel';
import { StudentModel } from '../../ClassModel/StudentModel';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { StaffModel } from '../../ClassModel/StaffModel';
import { UserModel } from '../../ClassModel/UserModel';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { PaperQuestionModel } from '../../ClassModel/PaperQuestionModel';
import { PaperAnswerMap } from '../../ClassModel/MapObject/PaperAnswerMap';
import { HttpError } from '../../Shared/httpError/HttpError';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';
import { StudentPaperModel } from '../../ClassModel/StudentPaperModel';
import { StudentPaperServiceService } from '../../service/student-paper/student-paper-service.service';

@Component({
  selector: 'app-paper-answer-sheet',
  templateUrl: './paper-answer-sheet.component.html',
  styleUrls: ['./paper-answer-sheet.component.scss']
})
export class PaperAnswerSheetComponent implements OnInit {

  
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
  

  errorMessage;
  errorUpdateMessage = "";
  httpError = new HttpError();
  apiUrl = API_URL;

  selectedFiles;
  showSpinner = false;
  downloadedPaper;

  noOfQuestions;
  noOfAnswers;
  questionCount: number[] = [];
  answerCount: number[] = [];
  answers: number[][] = [];
  viewAnswers = false;
  paperQuestions: PaperQuestionModel[] = [];
  isChecked: boolean[][] = [];
  isCheckedq = true; //temp
  paperAnswerMap: PaperAnswerMap;
  ans: String = "";
  
  systemDate;

  ////
  studentId;
  paperId;
  date;
  errorStudentId;
  errorPaperId;
  errorDate;
  savedStudentPaper;

  userValidation = new UserValidation();
  user: UserModel = new UserModel(0, '', '', '', '', '', '', '', new Date(), 0, 0, 0);
  staff: StaffModel = new StaffModel(1, this.user);
  adminStaff: AdminStaffModel = new AdminStaffModel(1, 'q', 1, this.staff);
  student:StudentModel=new StudentModel(0,new Date(),new Date(),this.user);
  paperData: PaperModel = new PaperModel(0, 'q', 0, 0, this.adminStaff, new Date());
  //paperData:PaperModel=new PaperModel(1,'','','',new AdminStaffModel());
  //studentData:StudentModel=new StudentModel(1,'Nuwan','0773015590','980150429v',new Date(),new Date(),'No 20 Homagama',new UserModel(1,'nuwan@gmail.com','1234',new Date(),1,1));
  paperSrc: string = '/paper-test.paper';
  constructor(

    // private router: Router,
    private route: ActivatedRoute,
    private paperService: PaperServiceService,
    private adminStaffService: AdminStaffServiceService,
    private fileUploadService: FileUploadServiceService,
    private studentpaperService: StudentPaperServiceService,
    private studentService: StudentServiceService,

  ) { }

  ngOnInit() {
    console.log("in paperMOREcomTS ngOnIt");
    this.paperId = this.route.snapshot.params['id'];//get paper id by url
   // this.paperDetails();
    this.userId = sessionStorage.getItem("userId");
   // this.setStudentId();
   this.paperDetails(); 
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
        this.setStudentId();
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    )

  }
  
  close() {
    this.isUpdateVariable = false;
  }

  setStudentId() {
   // this.paperDetails();
    console.log(this.userId+"Set Student");
    this.studentService.getStudentData(this.userId).subscribe(
      response => {
       
        this.studentId = response.studentId;
        this.student.userId=response.userId;
        this.student.examDate=response.examDate;
        this.student.studentId=response.studentId;
        this.student.trialDate=response.trialDate;
       // this.student=response;
         console.log("Setting Student"+this.student.trialDate);
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
        if (response == null) {
          console.log("Nothing Downloaded");
        }
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
  
  loadAnswers() {
    console.log("aaa");
    this.questionCount = [];
    this.answerCount = [];
    this.noOfQuestions = this.paperData.no_of_questions;
    this.noOfAnswers = this.paperData.no_of_answers;
    for (var i = 1; i < (this.noOfQuestions) % 10 + 1; i++) {
      this.questionCount.push(i);
    }
    for (var i = 1; i < (this.noOfAnswers) % 10 + 1; i++) {
      this.answerCount.push(i);
    }
    for (var i = 1; i < (this.noOfQuestions) % 10 + 1; i++) {
      this.answers[i - 1] = [];
      this.isChecked[i - 1] = [];
    }
    for (var i = 1; i < (this.noOfQuestions) % 10 + 1; i++) {
      for (var j = 1; j < (this.noOfAnswers) % 10 + 1; j++) {
        this.answers[i - 1].push(0);
      }
    }
    this.viewAnswers = true;

  }

  getAnswers(event) { //mark checked answers
    if (event.target.checked) {
    // console.log(event.target.data.('active'==0));
      console.log('checked: ' + event.target.id + 'Quest');
      console.log('checked: ' + event.target.value + 'Ans');
      this.answers[event.target.id - 1][event.target.value - 1] = (event.target.value); // set the checked answer for the question
      console.log(this.answers[event.target.id - 1][event.target.value - 1]);
    } else {
      console.log("hy");
      this.answers[event.target.id - 1][event.target.value - 1] = 0; // remove unchecked answer from list
      console.log(this.answers[event.target.id - 1][event.target.value - 1]);
    }
  }

  addStudentPaperAnswers() {
   // this.setStudentId();
    
    console.log("add stu ppr marks");
    var datePipe = new DatePipe('en-US');
    this.date = new Date();
    this.errorPaperId = "";
    this.errorStudentId = "";
    this.errorDate = "";


    //validate PaperId
    if (this.paperData === null) {
      console.log("Empty");
      this.errorPaperId = "Error getting Paper Id ";
    }

    //valid student Id
    if (this.student === null) {
      this.errorStudentId = "Error in getting Student Id"; 
    }

    //validate date
    if (this.date === null) {
      this.errorDate = "Error getting System Date";     }

    if (this.errorPaperId != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorPaperId,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (this.errorStudentId != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorStudentId,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (this.errorDate != "") {
      Swal.fire({
        position: 'center',
        type: 'error',
        text: this.errorDate,
        showConfirmButton: false,
        timer: 1500
      });
    }

    if (this.errorStudentId == "" && this.errorPaperId == "" && this.errorDate == "" ) {
      console.log("Ready to add"+this.student.studentId);
      this.studentpaperService.addStudentPaper(new StudentPaperModel(-1, this.student, this.paperData,this.date,-1),this.answers ).subscribe(
        response => {
          this.savedStudentPaper = response;
          console.log(response);
           Swal.fire({
             position: 'top-end',
             type: 'success',
             title: 'Answers Successfuly saved.',
             showConfirmButton: false,
             timer: 2000
           });
          // this.router.navigate(['paper-list'])*/
          //this.savedPaperDetails=response;
       
        },
        error => {
          console.log(error);//
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error saving Answers.',
            showConfirmButton: false,
            timer: 1500
          });//
          this.handleErrorResponse(error);
        }
      )
    }
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
