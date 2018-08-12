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

  constructor(private userService: UserServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

}
