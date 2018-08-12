import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceClient } from '../services/user.service.client';
import { EmailServiceClient } from '../services/email.service.client';
import { } from '@types/googlemaps';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;

  //User variables
  validUser = false;
  cookieValue = "";
  loggedIn = false;
  username;
  password;
  confirmPassword;
  usernameLogin;
  passwordLogin;
  errorMessage = "";
  icon1 = "sentiment_very_satisfied";
  icon2 = "sentiment_very_satisfied";

  //Query Variables
  email = "";
  queryText = "";

  constructor(private service: UserServiceClient, private emailService: EmailServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get("username");
    var mapProp = {
      center: new google.maps.LatLng(19.107280, 72.852060),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(19.107280, 72.852060),
    map: this.map,
    animation: google.maps.Animation.DROP
  });
  this.marker.setMap(this.map);
  }

  //Query Email
  sendQuery() {
  this.emailService.sendQueryEmail(this.email, this.queryText).then((response) => {
    window.location.reload();
  });
}

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

  //Register
  onRegister(username, password) {
    console.log("working");
      this.service.findAllUsers().then((users) => {
        users.map((user) => {
          if(user.username == username) {
            this.validUser = false;
            this.errorMessage = "Username is already taken";
            $("#RegisterErrorMessage").slideDown();
            return;
          }
          else if(this.password.length < 8 || this.confirmPassword.length < 8) {
            this.validUser = false;
            this.errorMessage = "Password has to be at least 8 characters in length";
            $("#RegisterErrorMessage").slideDown();
          }
          else {
            this.validUser = true;
          }
        })
      }).then(() => {
        if(this.validUser) {
          this.service.createUser(username, password)
          .then(() => {
            this.cookieService.set("username", username);
            this.cookieValue = this.cookieService.get("username");
            $("#signUpModal").modal("toggle");
            this.loggedIn = true;
            this.router.navigate(['profile']);
          });
        }
      });

    this.validUser = true;
  }

  //Login
  login(username, password) {
    if(username != undefined && password != undefined) {
      this.service.login(username, password).then((user) => {
        if(user != null) {
          this.cookieService.set("username", username);
          this.cookieValue = this.cookieService.get("username");
          $("#loginModal").modal("toggle");
          this.loggedIn = true;
          if(user.role == "admin") {
            this.router.navigate(['admin-page']);
          }
          else if(user.role == "technician") {
            this.router.navigate(['technician-page']);
          }
          else {
            this.router.navigate(['profile']);
          }
        }
        else {
          console.log("Unsuccessful");
          this.errorMessage = "Please check username/ password";
          $("#errorMessage").slideDown();
          $("#usrname").val("");
          $("#passwd").val("");
          return;
        }
      });
    }
    else {
      this.errorMessage = "Username and/ or password cannot be blank";
      $("#errorMessage").slideDown();
      return;
    }
  }

  //Logout
  logout() {
    this.cookieService.delete("username");
    this.loggedIn = false;
    this.service.logout().then(() => window.location.reload());
  }

  //Function to check if a user is logged in
  isLoggedIn() {
    if(this.cookieValue != "") {
      this.router.navigate(['make-appointment']);
    }
    else {
      alert("Please Log in to schedule an appointment");
    }
  }

}
