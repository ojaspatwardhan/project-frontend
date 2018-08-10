import { Component, OnInit } from '@angular/core';
import { AppointmentServiceClient } from '../services/appointment.service.client';
import { UserServiceClient } from '../services/user.service.client';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-technician-page',
  templateUrl: './technician-page.component.html',
  styleUrls: ['./technician-page.component.css']
})
export class TechnicianPageComponent implements OnInit {

  constructor(private userService: UserServiceClient, private appointmentService: AppointmentServiceClient, private cookieService: CookieService,private router: Router) { }

  //Other variables
  cookieValue = "";
  accessToken;

  //Appointments array
  appointments = [];

  //Search variables
  searchText;
  statusText;

  ngOnInit() {
    this.appointmentService.getAccessToken().then((response) => {
      this.cookieValue = this.cookieService.get("username");
      console.log(this.cookieValue);
      this.accessToken = response.access_token;
      if(this.cookieValue != "") {
        this.appointmentService.getAppointmentsForTechnician(this.accessToken)
        .then((appointments) => {
          this.appointments = appointments.data;
        });
      }
    });
  }

  logout() {
    this.cookieService.delete("username");
    this.userService.logout().then(() => this.router.navigate(['home']));
  }

}
