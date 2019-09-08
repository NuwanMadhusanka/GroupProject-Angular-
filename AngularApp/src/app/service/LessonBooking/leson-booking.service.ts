import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentPackageModel } from '../../ClassModel/StudentPackageModel';
import { API_URL } from '../../app.constants';

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
    return this.http.get<any>(`${API_URL}/lessonbooking/${date}/${studentPackageId}/${timeSlotId}`);
  }
}
