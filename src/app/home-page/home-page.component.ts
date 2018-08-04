import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  username;
  password;
  confirmPassword;
  usernameLogin;
  passwordLogin;
  errorMessage = "";
  icon1 = "sentiment_very_satisfied";
  icon2 = "sentiment_very_satisfied";

  constructor(private router: Router) { }

  validateUsername(username) {
    if(username.length > 15) {
      this.icon1 = "sentiment_dissatisfied";
      this.errorMessage = "Please enter a username with max 15 characters";
      $("#errorMessage").show("slow");
    }
    else {
      this.icon1 = "sentiment_very_satisfied";
      $("#errorMessage").hide("slow");
    }
  }

  validatePassword(password, confirmPassword) {
    if(password.length > 8 && confirmPassword.length > 8 && password != confirmPassword){
      this.icon2 = "sentiment_dissatisfied";
      this.errorMessage = "Passwords do not match";
      $("#errorMessage").show("slow");
    }
    else if(password.length < 8 || confirmPassword.length < 8) {
      this.icon2 = "sentiment_dissatisfied";
      this.errorMessage = "Password must be 8 characters long";
      $("#errorMessage").show("slow");
    }
    else {
      this.icon2 = "sentiment_very_satisfied";
      $("#errorMessage").hide("slow");
    }
  }

  goToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  ngOnInit() {
  }

}
