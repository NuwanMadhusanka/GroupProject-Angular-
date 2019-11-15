import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoServiceService } from '../../service/video/video-service.service';
import { VideoModel } from '../../ClassModel/VideoModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  errorMessage="";

  videos: VideoModel[] = [];

  validation: UserValidation = new UserValidation();

    //Filter Option Implement
  filteredVideos: VideoModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredVideos = this.filterVideo(value);
  }

  //Filtering method
  filterVideo(searchString: string) {
   return this.videos.filter(video =>
      video.videoId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      video.title.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      video.description.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      video.adminStaffId.adminStaffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      video.addedDate.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );
  }
  

  constructor(
    private router:Router,
    private videoService:VideoServiceService
  ) { }

  ngOnInit() {
    console.log("In Video List in videoListCom TS");
    this.videoList();
  }

  //get Student List
  videoList(){
    this.videoService.videoList().subscribe(
      response => {
        this.videos=response;
        this.filteredVideos=this.videos;
        console.log(response);
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }
   //navigate to studentRegister Page
  addVideo(){
      this.router.navigate(['video-add']) 
  }

  //navigate to more details page
  moreDetails(videoId){
    this.router.navigate(['video-more-details',videoId]);
  }

  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

//delete Video
  deleteVideo(videoId:Number){
    console.log("In vode del ts");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete student Details,Payemnt Details and all other relevant information.Can't revert the Data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        //Call to API
        this.videoService.deleteVideo(videoId).subscribe(
          response => {
            this.videoList(); 
            Swal.fire(
              'Deleted!',
              'Student Record has been deleted.',
              'success'
            )
          },
          error => {
            console.log(error);
            this.handleErrorResponse(error);
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Delete Is Not Successful!',
              footer: 'Something bad happened, please try again later.'
            })
          }
           
        )
      }
    })
  }


/*
 

  //get Student List
  studentList(){
    this.studentService.studentList().subscribe(
      response => {
        this.students=response;
        // console.log(this.students);
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }

  //delete Student
  
  //navigate to student-package
  addPackage(studentId:Number){
    console.log(studentId);
    this.router.navigate(['student-package-add',studentId])
  }

  //navigate to student-payment 
  addPayment(studentId){
    this.router.navigate(['student-payment',studentId])
  }

  

  closeError(){
    this.errorMessage="";
  }

  handleErrorResponse(error){
    this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
*/
}
