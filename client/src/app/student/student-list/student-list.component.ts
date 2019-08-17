import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../../service/student/student-service.service';
import { StudentModel } from '../../ClassModel/StudentModel';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: StudentModel[] = [];

  constructor(
    private router:Router,
    private studentService:StudentServiceService
  ) { }

  ngOnInit() {
    this.studentList();
  }

  //navigate to studentRegister Page
  addStudent(){
      this.router.navigate(['student-add'])
  }

  //get Student List
  studentList(){
    this.studentService.studentList().subscribe(
      response => {
        this.students=response;
        console.log(this.students);
      },
      error => {
        console.log(error);
      }
    )
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

}
