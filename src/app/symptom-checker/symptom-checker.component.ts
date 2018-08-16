import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceClient } from '../services/user.service.client';
import { SymptomCheckerServiceClient } from '../services/symptom-checker.service.client';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-symptom-checker',
  templateUrl: './symptom-checker.component.html',
  styleUrls: ['./symptom-checker.component.css']
})
export class SymptomCheckerComponent implements OnInit {

  //Session Storage Array
  public data: any = [];

  constructor(@Inject(SESSION_STORAGE) private storageService: WebStorageService, private cookieService: CookieService, private symptomCheckerService: SymptomCheckerServiceClient, private service: UserServiceClient, private router: Router) { }

  //
  uri = "https://sandbox-authservice.priaid.ch/login"
  apiKey = "ojas.patwardhan@gmail.com";
  secretKey = "y2F3Zwg4MEm5n7YDb";
  computedHash;
  computedHashString;
  token;

  //Search Variable
  symptom;
  birthYear;
  gender;
  genderValue;

  //Symptom Array
  symptomsArray = [];

  //Issues Array
  issues = [];

  //Information Variable
  info;

  //Flags
  inputFlag = false;

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

  ngOnInit() {
    this.cookieValue = this.cookieService.get("username");
    this.computedHash = crypto.HmacMD5(this.uri, this.secretKey);
    this.computedHashString = this.computedHash.toString(crypto.enc.Base64);
    this.symptomCheckerService.getToken(this.apiKey, this.computedHashString)
    .then((response) => {
      this.token = response.Token;
      this.getSymptoms();
      // alert("Please click on the Symptoms tab to proceed");
    });
  }

  //Getting Symptom List
  getSymptoms() {
  this.symptomCheckerService.getSymptoms(this.token)
  .then((symptoms) => {
    this.symptomsArray = symptoms;
    // this.storageService.set(symptoms[0].Name, symptoms[0].ID);
    // console.log(this.storageService.get(symptoms[0].Name));
    for(let i = 0; i < symptoms.length; i++) {
      this.storageService.set(symptoms[i].Name, symptoms[i].ID);
    }
  });
}

  //Getting Diagnosis
  getDiagnosis(symptom, gender, birthYear) {
  symptom = this.storageService.get(symptom);
  if(gender == "Male" || gender == "male" || gender == "m" || gender == "M") {
    this.genderValue = "Male";
    this.inputFlag = true;
  }
  else if(gender == "Female" || gender == "female" || gender == "f" || gender == "F") {
    this.genderValue = "Female";
    this.inputFlag = true;
  }
  else {
    console.log("inside else");
    this.inputFlag = false;
    alert("Please enter a valid gender");
  }
  if(this.inputFlag == true) {
    this.symptomCheckerService.getDiagnosis(symptom, this.genderValue, birthYear, this.token)
    .then((issues) => {
      this.issues = issues;
    }).then(() => {
      $(".nav-pills a[href='#issues']").removeClass("disabled").tab("show");
      $("#symptomInput").val("");
      $("#genderinput").val("");
      $("#birthInput").val("");
    });
  }
}

  //Getting Description
  getDescription(id) {
  this.symptomCheckerService.getDescription(id, this.token)
  .then((info) => {
    this.info = info;
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
