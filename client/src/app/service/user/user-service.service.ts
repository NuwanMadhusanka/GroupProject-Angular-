import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class UserBean{
  constructor(
    public userId:Number,
    public email:String,
    public password:String,
    public regDate:Date,
    public status:Number,
    public role:Number
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http:HttpClient
  ) { }

  userRegister(user:UserBean){
      return this.http.post(`http://localhost:8080/user/register`,user);
  }
}
