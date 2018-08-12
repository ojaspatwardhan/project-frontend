import { Component, OnInit } from '@angular/core';
import { UserServiceClient } from '../services/user.service.client';
import { User } from '../models/user.model.client';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  //User object
  user: User = new User();

  //Users Array
  users = [];

  constructor(private userService: UserServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.userService.findAllUsers()
    .then((users) => {
      this.users = users;
    });
  }

  createUserByAdmin(user: User){
    this.userService.createUserByAdmin(user.username, user.password, user.firstName, user.lastName, user.email, user.address, user.role)
    .then((user) => {
      console.log(user);
      this.userService.findAllUsers().then((users) => {
        this.users = users;
        $("#username").val("");
        $("#password").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $("#address").val("");
        $("#role").val("");
        window.location.reload();
      });
    });
  }

}
