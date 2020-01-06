import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VideoModel } from '../../ClassModel/VideoModel';
import { API_URL } from '../../app.constants';


/*import { StudentPackageAddComponent,StudentPackage } from '../../student/student-package-add/student-package-add.component';
import { PackageModel } from '../../ClassModel/PackageModel';
import { CourseFee } from '../../ClassModel/CourseFeeModel';
import { PayPal } from '../../student/student-payment/student-payment.component';
import { ExamList } from '../../adminStaff/admin-staff-student-dash-board/admin-staff-student-dash-board.component';
*/


@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor(
    private http:HttpClient,
  ) { }

//get video List
videoList(){
      return this.http.get<VideoModel[]>(`${API_URL}/videos`);
  }

  //Get Specific video Details using videoID
  getVideobyID(videoId){
    return this.http.get<VideoModel>(`${API_URL}/video/${videoId}`);
  }

  //add new video
  addVideo(video:VideoModel){
    console.log("In video Service add meth");
    console.log(video);
    return this.http.post<VideoModel>(`${API_URL}/video/add`,video);
  }

   deleteVideo(videoId){
     console.log("In video Service delete meth");
     console.log(videoId);
    return this.http.delete<any>(`${API_URL}/video/delete/${videoId}`);
  }


  //Update Video Data
  updateVideo(video:VideoModel){
    return this.http.put<VideoModel>(`${API_URL}/video/update`,video);
  }
  /*//register the new student
  studentRegister(student:StudentModel){
    console.log(student);
    return this.http.post<StudentModel>(`${API_URL}/student/register`,student);
    //console.log(user);
  }


  //getStudent following package's Id(Result is integer list)
  studentPackagesId(id:Number){
    return this.http.get<[]>(`${API_URL}/student/package/${id}`);
  }

  //getStudent following package's(result is packageModel(list))
  studentPackages(id:Number){
    return this.http.get<PackageModel[]>(`${API_URL}/student/package/list/${id}`)
  }


  //insert student package details
  studentPackegeAdd(selectedPackage,id){
    return this.http.post<any>(`${API_URL}/student/package/${id}`,selectedPackage);
  }

  //delete student package details
  studentPackegeDelete(stuId,pacId){
    return this.http.delete<any>(`${API_URL}/student/package/${stuId}/${pacId}`);
  }

  //get student CourseFee Details
  studentCourseFees(stuId,pacId){
    return this.http.get<[]>(`${API_URL}/student/coursefees/${stuId}/${pacId}`);
  }

  // Add Course Fees
  studentCourseFeeAdd(courseFee:CourseFee,studentPackageId,packageId){
    
    console.log(courseFee+" package Id:"+studentPackageId)
     return this.http.post<any>(`${API_URL}/student/coursefee/${studentPackageId}/${packageId}`,courseFee);
  }

  

  //Update Student Data
  studentUpdate(student:StudentModel){
    return this.http.put<StudentModel>(`${API_URL}/student/update`,student);
  }

  //delete Student Data
  studentDelete(stuId){
    return this.http.delete<any>(`${API_URL}/student/${stuId}`);
  }

  //get StudentId
  getStudentId(userId){
    return this.http.get<Number>(`${API_URL}/student/id/${userId}`);
  }

  //paypal
  makePayment(sum) {
    return this.http.post<PayPal>(`${API_URL}/paypal/make/payment/?sum=`+sum,{});
  }

  studentTrialList(date){
    return this.http.get<ExamList[]>(`${API_URL}/student/trial/list?date=`+date);
  }

  studentExamList(date){
    return this.http.get<ExamList[]>(`${API_URL}/student/exam/list?date=`+date);
  }

  //written Exam Data
  studentWrittenExamData(){
    return this.http.get<[]>(`${API_URL}/student/writtenexam/result`);
  }

  submitWrittenExamResult(date,countPass,countFail){
    return this.http.post<any>(`${API_URL}/student/writtenexam/result?date=`+date+"&countPass="+countPass+"&countFail="+countFail,{});
  }

  submitTrialExamResult(date,countPass,countFail){
    return this.http.post<any>(`${API_URL}/student/trialexam/result?date=`+date+"&countPass="+countPass+"&countFail="+countFail,{});
  }
*/

}
