import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSlotModel } from '../../ClassModel/TimeSlotModel';


@Injectable({
  providedIn: 'root'
})
export class TimeTableServiceService {

  constructor(
    private http:HttpClient
  ) { }

  getTimeSlotList(){
    return this.http.get<TimeSlotModel[]>('http://localhost:8080/timetable/timeslots');
  }

  updateTimeSlot(timeSlot:TimeSlotModel){
    return this.http.put<any>('http://localhost:8080/timetable/timeslot',timeSlot);  
  }

  addTimeSlot(timeSlot:TimeSlotModel){
    return this.http.post<any>('http://localhost:8080/timetable/timeslot',timeSlot);  
  }

  deleteTimeSlot(timeSlotId){
    return this.http.delete(`http://localhost:8080/timetable/timeslot/${timeSlotId}`);
  }

}
