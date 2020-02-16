import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StudentPackageAddComponent, StudentPackage } from '../../student/student-package-add/student-package-add.component';
import { VideoModel } from '../../ClassModel/VideoModel';
import { PackageModel } from '../../ClassModel/PackageModel';
import { CourseFee } from '../../ClassModel/CourseFeeModel';
import { PayPal } from '../../student/student-payment/student-payment.component';
import { ExamList } from '../../adminStaff/admin-staff-student-dash-board/admin-staff-student-dash-board.component';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor(
    private http: HttpClient,
  ) { }


  //get VideoList
  videoList() {
    console.log("In Vido SErvice -VideoList");
    return this.http.get<VideoModel[]>(`${API_URL}/videos`);
  }

  //Get Specific video Details
  getVideo(videoId) {
    console.log("In service getVideo");
    return this.http.get<VideoModel>(`${API_URL}/video/${videoId}`);

  }
  //save new video
  saveVideo(video: VideoModel) {
    console.log(video);
    return this.http.post<VideoModel>(`${API_URL}/video/add`, video);

  }

  //delete Video details
  deleteVideo(videoId) {
    console.log("in service vdo del");
    return this.http.delete<any>(`${API_URL}/video/${videoId}`);
  }

  //Update Video Data
  updateVideo(video: VideoModel) {
    return this.http.put<VideoModel>(`${API_URL}/video/update`, video);
  }

}
