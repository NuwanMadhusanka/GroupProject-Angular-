import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSlotModel } from '../../ClassModel/TimeSlotModel';
import { API_URL } from '../../app.constants';
import { PackageModel } from '../../ClassModel/PackageModel';
import { Path } from '../../ClassModel/PathModel';
import { InstructorMap } from '../../ClassModel/MapObject/InstructorMap';


@Injectable({
  providedIn: 'root'
})
export class TimeTableServiceService {

  constructor(
    private http:HttpClient
  ) { }

  //Time Slots URL
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

  //Path URL
  addPath(path:Path){
    return this.http.post<any>(`${API_URL}/timetable/path`,path);
  }

  deletePath(pathId){
    console.log(pathId);
    return this.http.delete<any>(`${API_URL}/timetable/path/${pathId}`)
  }

  getPathList(){
    return this.http.get<Path[]>(`${API_URL}/timetable/path`);
  }

  updatePath(path:Path){
    console.log(path)
    return this.http.put<any>(`${API_URL}/timetable/path`,path);
  }

  //subPath
  addSubPath(pathId,subPaths){
    return this.http.post<Number>(`${API_URL}/timetable/subpath/${pathId}`,subPaths);
  }

  getSubPathList(pathId){
    return this.http.get<String[]>(`${API_URL}/timetable/subpath/${pathId}`);
  }

  updateSubPath(pathId,subPaths){
    console.log(pathId)
    console.log(subPaths)
    return this.http.put<Number>(`${API_URL}/timetable/subpath/${pathId}`,subPaths);
  }


  getRelevantInstructorsList(day:Number ,selectPackageId:Number, selectTimeSlotId:Number, selectPathId:Number, transmission:Number){
      return this.http.get<InstructorMap[]>(`${API_URL}/timetable/instructors/${day}/${selectPackageId}/${selectTimeSlotId}/${selectPathId}/${transmission}`);
  }

  //lesson url
  addLesson(day,timeSlotId,pathId,packageId,instructorId,numStudent,transmission){
      return this.http.post<any>(`${API_URL}/timetable/lesson/${day}/${packageId}/${timeSlotId}/${pathId}/${transmission}/${instructorId}/${numStudent}`,{});
  }

}
