import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StudentPackageAddComponent,StudentPackage } from '../../student/student-package-add/student-package-add.component';
import { LeaveModel } from '../../ClassModel/LeaveModel';
import { PackageModel } from '../../ClassModel/PackageModel';
import { CourseFee } from '../../ClassModel/CourseFeeModel';
import { PayPal } from '../../student/student-payment/student-payment.component';
import { ExamList } from '../../adminStaff/admin-staff-student-dash-board/admin-staff-student-dash-board.component';
import { API_URL } from '../../app.constants';






@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {

  constructor(
    private http:HttpClient,
  ) { }


//get VideoList
  LeaveList(){
      //console.log("abd");
      console.log("In Vido SErvice -LeaveList");
      return this.http.get<LeaveModel[]>(`${API_URL}/leaves`);
  }

    //Get Specific video Details
  getLeave(leaveId){
    console.log("In service get Leave");
    return this.http.get<LeaveModel>(`${API_URL}/leave/${leaveId}`);

  }
   //save new video
  saveLeave(leave:LeaveModel){
    console.log(leave);
    return this.http.post<LeaveModel>(`${API_URL}/leave/add`,leave); 
   
  }

  //delete Video details
  deleteLeave(leaveId){
    console.log("in service vdo del");
    return this.http.delete<any>(`${API_URL}/leave/${leaveId}`);
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
