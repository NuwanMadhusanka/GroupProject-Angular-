import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AdminStaffModel } from '../../ClassModel/AdminStaffModel';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminStaffServiceService {

  constructor(
    private http:HttpClient,
  ) { }

  /*userRegister(user:UserModel){
      console.log(user);
      return this.http.post<UserModel>('http://localhost:8080/user/register',user);
      //console.log(user);
  }

  userDelete(userId:Number){
    console.log(userId)
    return this.http.delete<any>(`http://localhost:8080/user/${userId}`);
  }*/
  getAdminStaffFromUserID(userId:number){
      return this.http.get<AdminStaffModel>(`${API_URL}/adminByUserId/${userId}`);     
  }
}
