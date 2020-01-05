import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StudentPackageAddComponent,StudentPackage } from '../../student/student-package-add/student-package-add.component';
import { FeedBackModel } from '../../ClassModel/FeedBackModel';
import { PackageModel } from '../../ClassModel/PackageModel';
import { CourseFee } from '../../ClassModel/CourseFeeModel';
import { PayPal } from '../../student/student-payment/student-payment.component';
import { ExamList } from '../../adminStaff/admin-staff-student-dash-board/admin-staff-student-dash-board.component';
import { API_URL } from '../../app.constants';






@Injectable({
  providedIn: 'root'
})
export class FeedBackServiceService {

  constructor(
    private http:HttpClient,
  ) { }


//get VideoList
  FeedBackList(){
      //console.log("abd");
      console.log("In Vido SErvice -VideoList");
      return this.http.get<FeedBackModel[]>(`${API_URL}/feedbacks`);
  }

    //Get Specific video Details
  getFeedBack(feedbackId){
    console.log("In service getVideo");
    return this.http.get<FeedBackModel>(`${API_URL}/feedback/${feedbackId}`);

  }
   //save new video
  saveFeedBack(feedback:FeedBackModel){
    console.log(feedback);
    return this.http.post<FeedBackModel>(`${API_URL}/feedback/add`,feedback); 
   
  }

  //delete Video details
  deleteFeedBack(feedbackId){
    console.log("in service vdo del");
    return this.http.delete<any>(`${API_URL}/feedback/${feedbackId}`);
  }

  //Update Video Data
  updateFeedBack(feedback:FeedBackModel){
    return this.http.put<FeedBackModel>(`${API_URL}/feedback/update`,feedback);
  }

/*
 

  //get StudentList
  studentList(){
      //console.log("abd");

      return this.http.get<StudentModel[]>(`${API_URL}/students`);
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

  

  //get student CourseFee Details
  studentCourseFees(stuId,pacId){
    return this.http.get<[]>(`${API_URL}/student/coursefees/${stuId}/${pacId}`);
  }

  // Add Course Fees
  studentCourseFeeAdd(courseFee:CourseFee,studentPackageId,packageId){
    
    console.log(courseFee+" package Id:"+studentPackageId)
     return this.http.post<any>(`${API_URL}/student/coursefee/${studentPackageId}/${packageId}`,courseFee);
  }

  //Get Specific Student Details
  studentGet(studentId){
    return this.http.get<StudentModel>(`${API_URL}/student/${studentId}`);
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
