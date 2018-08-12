import { Component, OnInit } from '@angular/core';
import { UserServiceClient } from '../services/user.service.client';
import { User } from '../models/user.model.client';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  //User Variables
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

  //Users Array
  users = [];

  //User object
  user: User = new User();

  constructor(private userService: UserServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get("username");
    this.userService.findAllUsers()
    .then((users) => {
      this.users = users;
      console.log(this.users);
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

  login(username, password) {
    if(username != undefined && password != undefined) {
      this.userService.login(username, password).then((user) => {
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

  logout() {
    this.cookieService.delete("username");
    this.loggedIn = false;
    this.router.navigate(["home"]);
  }

  onRegister(username, password) {
      this.userService.findAllUsers().then((users) => {
        users.map((user) => {
          if(user.username == username) {
            console.log("inside if");
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
          this.userService.createUser(username, password)
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

  isLoggedIn() {
    if(this.cookieValue != "") {
      this.router.navigate(['make-appointment']);
    }
    else {
      alert("Please Log in to schedule an appointment");
    }
  }

  //Delete User
  deleteUser(id) {
    console.log(id);
    this.userService.removeUser(id).then((response) => {
      this.userService.findAllUsers()
      .then((users) => {
        this.users = users;
        console.log(this.users);
      });
    });
  }

  //Get User
  getUser(id) {
  this.userService.findUserById(id).then((user) => {
    this.user = user;
  });
}

  //Update User
  updateUser(user: User) {
  console.log(user);
  this.userService.updateUser(user).then((response) => {
    $("#userModal").modal("toggle");
    this.userService.findAllUsers()
    .then((users) => {
      this.users = users;
      console.log(this.users);
    });
  });
}

}
