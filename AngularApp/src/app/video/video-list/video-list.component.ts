import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoServiceService } from '../../service/video/video-service.service';
import { VideoModel } from '../../ClassModel/VideoModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  errorMessage = "";

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

  //Video Filtering method
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
    private videoService: VideoServiceService
  ) { }

  ngOnInit() {
    this.videoList();
  }

  //get Video List
  videoList() {
    this.videoService.videoList().subscribe(
      response => {
        this.videos = response;
        this.filteredVideos = this.videos;
      },
      error => {
        this.handleErrorResponse(error);
      }
    )
  }

  //navitage to video add form
  addVideo() {
    this.router.navigate(['video-add'])
  }

  //navigate to more details page
  moreDetails(videoId) {
    this.router.navigate(['video-more-details', videoId]);
  }

//error handling
  handleErrorResponse(error) {
    this.errorMessage = "There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }

  //delete Video
  deleteVideo(videoId: Number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Video details will be deleted.Can't revert the Data!",
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
          //error deleting video
          error => {
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

}
