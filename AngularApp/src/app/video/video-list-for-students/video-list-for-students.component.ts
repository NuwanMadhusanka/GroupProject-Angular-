import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoServiceService } from '../../service/video/video-service.service';
import { VideoModel } from '../../ClassModel/VideoModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-video-list-for-students',
  templateUrl: './video-list-for-students.component.html',
  styleUrls: ['./video-list-for-students.component.scss']
})
export class VideoListForStudentsComponent implements OnInit {

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
     // video.videoId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      video.title.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      video.description.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
     // video.adminStaffId.adminStaffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
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

  
}
