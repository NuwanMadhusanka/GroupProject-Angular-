import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSlotModel } from '../../ClassModel/TimeSlotModel';
import { API_URL } from '../../app.constants';
import { PackageModel } from '../../ClassModel/PackageModel';


@Injectable({
  providedIn: 'root'
})
export class TimeTableServiceService {

  constructor(
    private http:HttpClient
  ) { }

  getTimeSlotList(){
    return this.http.get<TimeSlotModel[]>(`${API_URL}/timetable/timeslots`);
  }

  updateTimeSlot(timeSlot:TimeSlotModel){
    return this.http.put<any>(`${API_URL}/timetable/timeslot`,timeSlot);  
  }

  addTimeSlot(timeSlot:TimeSlotModel){
    return this.http.post<any>(`${API_URL}/timetable/timeslot`,timeSlot);  
  }

  deleteTimeSlot(timeSlotId){
    return this.http.delete(`${API_URL}/timetable/timeslot/${timeSlotId}`);
  }

  getRelevantInstructorsList(day:Number ,selectPackageId:Number, selectTimeSlotId:Number, transmission:Number){
      return this.http.get<any>(`${API_URL}/timetable/instructors/${day}/${selectPackageId}/${selectTimeSlotId}/${transmission}`);
  }
}
