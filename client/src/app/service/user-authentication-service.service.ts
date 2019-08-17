import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserBean } from '../login/login.component';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationServiceService {


  constructor(
    private http:HttpClient,
  ) { }

  authenticate(email,password){
    return this.http.get<UserBean>(`http://localhost:8080/login/${email}/${password}`);
  }
}
