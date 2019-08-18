import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StudentPackageAddComponent,StudentPackage } from '../../student/student-package-add/student-package-add.component';
import { StudentModel } from '../../ClassModel/StudentModel';
import { PackageModel } from '../../ClassModel/PackageModel';
import { CourseFee } from '../../ClassModel/CourseFeeModel';





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
  studentPackegeAdd(selectedPackages,id){
    console.log(selectedPackages);
    return this.http.post<String>(`http://localhost:8080/student/package/list/${id}`,selectedPackages);
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
  studentCourseFeeAdd(courseFee:CourseFee,studentPackageId){
     return this.http.post<any>(`http://localhost:8080/student/coursefee/${studentPackageId}`,courseFee);
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

}
