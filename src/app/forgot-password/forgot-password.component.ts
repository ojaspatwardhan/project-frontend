import { Component, OnInit } from '@angular/core';
import { UserServiceClient } from '../services/user.service.client';
import { EmailServiceClient } from '../services/email.service.client';
import { User } from '../models/user.model.client';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  //Variables
  emailId;
  errorMessage;
  email;
  password;

  constructor(private service: UserServiceClient, private emailService: EmailServiceClient, private router: Router) { }

  ngOnInit() {
  }

  //Forgot Password
  forgotPassword() {
  this.service.findUserByEmail(this.emailId).then((user) => {
    if(user.length != 0) {
      this.email = user[0].email;
      this.password = user[0].password;
      this.emailService.sendForgotPasswordEmail(this.email, this.password);
      alert("Please check your email");
      this.router.navigate(["home"]);
    }
    else {
      this.errorMessage = "Please enter a valid email";
      $("#errorMessage").slideDown();
    }
  });
}

}
