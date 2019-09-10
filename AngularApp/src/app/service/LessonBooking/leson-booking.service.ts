import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentPackageModel } from '../../ClassModel/StudentPackageModel';
import { API_URL } from '../../app.constants';
import { LessonModel } from '../../ClassModel/LessonModel';
import { PackageModel } from '../../ClassModel/PackageModel';
import { StudentLessonModel } from '../../ClassModel/StudentLessonModel';

@Injectable({
  providedIn: 'root'
})
export class LesonBookingService {

  constructor(
    private http  : HttpClient
  ) { }

  getStudentPackageData(userId){
    return this.http.get<StudentPackageModel[]>(`${API_URL}/lessonbooking/studentpackage/${userId}`);
  }

  getTrialDate(userId){
    return this.http.get<Date>(`${API_URL}/lessonbooking/trialdate/${userId}`);
  }

  getAvailableLesson(date,studentPackageId,timeSlotId){
    return this.http.get<LessonModel>(`${API_URL}/lessonbooking/${date}/${studentPackageId}/${timeSlotId}`);
  }

  saveBooking(lessonId,studentPackegeId,date){
    return this.http.post<Number>(`${API_URL}/lessonbooking/${lessonId}/${studentPackegeId}/${date}`,{});
  }

  //get Student following package details
  getStudentPackages(userId){
    return this.http.get<PackageModel[]>(`${API_URL}/lessonbooking/studentpackages/${userId}`);
  }

  //get Student's Booking lesson details
  getBookLessonDetails(userId,packageId){
    return this.http.get<StudentLessonModel[]>(`${API_URL}/lessonbooking/booklessons/${userId}/${packageId}`);
  }
}
