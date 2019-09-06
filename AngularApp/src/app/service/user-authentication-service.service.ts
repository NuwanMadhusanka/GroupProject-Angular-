import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../ClassModel/UserModel';



@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationServiceService {


  constructor(
    private http:HttpClient,
  ) { }

  authenticate(email,password){
    return this.http.get<UserModel>(`http://localhost:8080/login/${email}/${password}`);
  }
}
