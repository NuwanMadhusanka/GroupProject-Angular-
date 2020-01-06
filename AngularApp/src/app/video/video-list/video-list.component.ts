import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoServiceService } from '../../service/video/video-service.service';
import { VideoModel } from '../../ClassModel/VideoModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  errorMessage = "";
  videos: VideoModel[] = [];

  validation: UserValidation = new UserValidation();
  apiUrl = API_URL;

  //Filter Option Implement
  filteredVideo: VideoModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredVideo = this.filterVideo(value);
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
    private router: Router,
    private videoService: VideoServiceService,



  ) { }

  ngOnInit() {
    this.videoList();
  }

  //to get the list of Videos
  videoList() {

    this.videoService.videoList().subscribe(
      response => {
        this.videos = response;
        this.filteredVideo = this.videos;
        //for(let video of this.videos){
        console.log(this.videos);
        // }
        // this.handleErrorResponse(this.videos[0].adminStaff==null);
      },
      error => {
        //this.errorMessage=response;
        this.handleErrorResponse(error);
      }
    )
  }
  handleErrorResponse(error) {
    this.errorMessage = error;
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
  closeError() {
    this.errorMessage = "";
  }

  //navigate to more details page of video
  moreDetails(videoId) {
    console.log("in videolistcomTS " + videoId);
    this.router.navigate(['video-more-details', videoId]);
    // console.log(this.router.navigate(['video-more-details',videoId]));
  }

  addVideo() {
    console.log("In videolist com ts 1");
    this.router.navigate(['video-add']);
    console.log("In videolist com ts 2");
  }

  //delete Video
  deleteVideo(videoId: Number) {
    console.log("INvideoDelinCOMTS");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Video.Can't revert the Data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log("INvideoDelinCOMTS2");
        //Call to API
        this.videoService.deleteVideo(videoId).subscribe(
          response => {
            this.videoList();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'PDf id :' + videoId + ' record was successfuly deldeted',
              showConfirmButton: false,
              timer: 3000
            });
          },
          error => {
            console.log("error");
            console.log(error);
            this.handleErrorResponse(error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'PDf id :' +videoId + '\'s record was not successfuly deleted',
              showConfirmButton: false,
              timer: 3000
            });
          }

        )
      }
    })
  }



  /*
    //navigate to studentRegister Page
    addStudent(){
        this.router.navigate(['student-add'])
    }
  
   
  
    //navigate to student-package
    addPackage(studentId:Number){
      console.log(studentId);
      this.router.navigate(['student-package-add',studentId])
    }
  
    //navigate to student-payment 
    addPayment(studentId){
      this.router.navigate(['student-payment',studentId])
    }
  
    //navigate to more details page
    
  
    
  
    handleErrorResponse(error){
      this.errorMessage="There is a problem with the service. please try again later.";
      let httpError = new HttpError();
      httpError.ErrorResponse(error);
    }
  */
}
