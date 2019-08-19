import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserAuthenticationServiceService } from '../service/user-authentication-service.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //reactive form definition
  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });

  //getters for reactive form module email
  get emailField(){
    return this.loginForm.get('email')
  }

  //getters for reactive form module password
  get passwordField(){
    return this.loginForm.get('password')
  }

  errorMessage;


  constructor(
    private router:Router,
    private userAuthenticationService:UserAuthenticationServiceService,
    private fb:FormBuilder
  ) { }

  ngOnInit(
  
  ) {
    
  }

  handleLogin(){

    if(this.loginForm.valid){
        //2) get the relevant data by userAuthentication Service(Call to API)
        
        this.userAuthenticationService.authenticate(this.emailField.value,this.passwordField.value).subscribe(
          response => this.handleSuccessfulResponse(response),
          error => {
            this.errorMessage="Login Denied.";
            this.handleErrorResponse(error)
          }
        )
    }else{
        this.errorMessage="Insert Valid Inputs";
    } 

  }

  //3)Valid User
  handleSuccessfulResponse(response){
    if(response.userId != null){
      sessionStorage.setItem('userId',response.userId);
      sessionStorage.setItem('userRole',response.role);
      // should check status backendside
      this.router.navigate(['dashboard'])
    }
  }

  //Invalid User
  private handleErrorResponse(error: HttpErrorResponse) {
    //this.errorMessage="Not successful request";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorMessage="Check the Network Connection"
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  //
  closeError(){
    this.errorMessage=null;
  }

}
