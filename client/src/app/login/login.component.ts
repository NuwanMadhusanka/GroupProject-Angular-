import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserAuthenticationServiceService } from '../service/user-authentication-service.service';


export class UserBean{
  constructor(
    public userId:Number,
    public email:String,
    public password:String,
    public regDate:String,
    public status:Number,
    public role:Number
  ){}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage;

  //1.form control 
  email=new FormControl();
  password=new FormControl();

  constructor(
    private router:Router,
    private userAuthenticationService:UserAuthenticationServiceService
  ) { }

  ngOnInit(
  
  ) {
    
  }

  handleLogin(){
    
    //1)validation
    if(this.email.value==="" &&  this.password.value==="" ){
      this.errorMessage="Enter Valid Email & Password!";
    }else{

      //2) get the relevant data by userAuthentication Service

      this.userAuthenticationService.authenticate(this.email.value,this.password.value).subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      )
    }

  }

  //3)Valid User
  handleSuccessfulResponse(response){
    if(response.userId != null){
      sessionStorage.setItem('userId',response.userId);
      sessionStorage.setItem('userRole',response.role);
      // should check status backendside
      this.router.navigate([''])
    }
  }

  //Invalid User
  handleErrorResponse(error){
    this.errorMessage="Enter Valid Email & Password";
  }

  //
  closeError(){
    this.errorMessage=null;
  }

}
