import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StudentPackageAddComponent,StudentPackage } from '../../student/student-package-add/student-package-add.component';
import { StudentModel } from '../../ClassModel/StudentModel';
import { PackageModel } from '../../ClassModel/PackageModel';
import { CourseFee } from '../../ClassModel/CourseFeeModel';
import { PayPal } from '../../student/student-payment/student-payment.component';
import { ExamList } from '../../adminStaff/admin-staff-student-dash-board/admin-staff-student-dash-board.component';






@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(
    private http:HttpClient,
  ) { }

  //register the new student
  studentRegister(student:StudentModel){
    console.log(student);
    return this.http.post<StudentModel>('http://localhost:8080/student/register',student);
    //console.log(user);
  }

  //get StudentList
  studentList(){
      return this.http.get<StudentModel[]>('http://localhost:8080/students');
  }

  //getStudent following package's Id(Result is integer list)
  studentPackagesId(id:Number){
    return this.http.get<[]>(`http://localhost:8080/student/package/${id}`);
  }

  //getStudent following package's(result is packageModel(list))
  studentPackages(id:Number){
    return this.http.get<PackageModel[]>(`http://localhost:8080/student/package/list/${id}`)
  }


  //insert student package details
  studentPackegeAdd(selectedPackage,id){
    return this.http.post<any>(`http://localhost:8080/student/package/${id}`,selectedPackage);
  }

  //delete student package details
  studentPackegeDelete(stuId,pacId){
    return this.http.delete<any>(`http://localhost:8080/student/package/${stuId}/${pacId}`);
  }

  //get student CourseFee Details
  studentCourseFees(stuId,pacId){
    return this.http.get<[]>(`http://localhost:8080/student/coursefees/${stuId}/${pacId}`);
  }

  // Add Course Fees
  studentCourseFeeAdd(courseFee:CourseFee,studentPackageId,packageId){
    
    console.log(courseFee+" package Id:"+studentPackageId)
     return this.http.post<any>(`http://localhost:8080/student/coursefee/${studentPackageId}/${packageId}`,courseFee);
  }

  //Get Specific Student Details
  studentGet(studentId){
    return this.http.get<StudentModel>(`http://localhost:8080/student/${studentId}`);
  }

  //Update Student Data
  studentUpdate(student:StudentModel){
    return this.http.put<StudentModel>('http://localhost:8080/student/update',student);
  }

  //delete Student Data
  studentDelete(stuId){
    return this.http.delete<any>(`http://localhost:8080/student/${stuId}`);
  }

  //get StudentId
  getStudentId(userId){
    return this.http.get<Number>(`http://localhost:8080/student/id/${userId}`);
  }

  //paypal
  makePayment(sum) {
    return this.http.post<PayPal>(`http://localhost:8080/paypal/make/payment/?sum=`+sum,{});
  }

  studentTrialList(date){
    return this.http.get<ExamList[]>('http://localhost:8080/student/trial/list?date='+date);
  }

  studentExamList(date){
    return this.http.get<ExamList[]>(`http://localhost:8080/student/exam/list?date=`+date);
  }

  //written Exam Data
  studentWrittenExamData(){
    return this.http.get<[]>('http://localhost:8080/student/writtenexam/result');
  }

  submitWrittenExamResult(date,countPass,countFail){
    return this.http.post<any>(`http://localhost:8080/student/writtenexam/result?date=`+date+"&countPass="+countPass+"&countFail="+countFail,{});
  }

  submitTrialExamResult(date,countPass,countFail){
    return this.http.post<any>(`http://localhost:8080/student/trialexam/result?date=`+date+"&countPass="+countPass+"&countFail="+countFail,{});
  }

  createBasicAuthenticationHttpHeader(){
    let username="drivo";
    let password="1234";
    let basicAuthHeaderString='Basic ' + window.btoa(username +  ':' + password);
    return basicAuthHeaderString;
  }
}
