import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model.client';
import { UserServiceClient } from '../services/user.service.client';
import { AppointmentServiceClient } from '../services/appointment.service.client';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User = new User();
  accessToken;
  appointment;
  isAppointment = false;
  cookieValue = "";
  userId;
  appointmentId;
  newAppointmentId;
  errorMessage = "";

  //Available Times Array
  availableTimes = [];

  constructor(private appointmentService: AppointmentServiceClient, private service: UserServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.service.profile().then((user) => {
      this.user = user;
      this.userId = user._id;
    }).then(() => {
      this.cookieValue = this.cookieService.get("username");
      // this.userId = this.user._id;
      this.cookieService.set("id", this.userId);
      // console.log(this.cookieService.get("id"));
      this.appointmentService.getAccessToken().then((response) => {
        this.accessToken = response.access_token;
        if(this.user.appointmentId != null) {
          this.appointmentId = this.user.appointmentId;
          // console.log(this.appointmentId);
          this.appointmentService.getAppointment(this.accessToken, this.user.appointmentId)
          .then((appointment) => {
            if(appointment.status != "CN") {
              this.appointment = appointment;
              this.isAppointment = true;
            }
            else {
              this.isAppointment = false;
            }
          });
        }
      });
    });
  }

  logout() {
    this.cookieService.delete("username");
    this.service.logout().then(() => this.router.navigate(['home']));
  }

  isLoggedIn() {
    if(this.cookieValue != "") {
      this.router.navigate(['make-appointment']);
    }
    else {
      alert("Please Log in to schedule an appointment");
    }
  }

  //Reschedule Appointment
  rescheduleAppointment(id) {
    // console.log(id);
    this.appointmentService.rescheduleAppointment(id, this.accessToken)
    .then((response) => {
      this.availableTimes = response.availableTimes;
    }).then(() => {
      $("#availableTimesModal").modal("show");
    });
  }

  //Confirm Reschedule
  confirmReschedule(startDateTime, endDateTime) {
  this.appointmentService.confirmReschedule(this.accessToken, this.appointmentId, startDateTime, endDateTime).
  then((appointment) => {
    this.newAppointmentId = appointment.id;
    this.service.findUserById(this.userId).then((user) => {
      this.user = user;
      this.user.appointmentId = this.newAppointmentId;
      this.appointmentId = this.newAppointmentId;
      this.service.updateUser(this.user).then(() => {
        $("#availableTimesModal").modal("toggle");
        this.appointmentService.getAppointment(this.accessToken, this.newAppointmentId)
        .then((appointment) => {
          this.appointment = appointment;
          this.isAppointment = true;
        });
      })
    })
    // window.location.reload();
    // console.log(response);
  });
  // console.log(this.appointmentId + " " + startDateTime + " " + endDateTime);
}

  updateUser(user: User) {
    if( this.user.email == "" || this.user.firstName == "") {
      this.errorMessage = "First name and Email are required";
      $("#errorMessage").slideDown();
    }
    else {
      this.service.updateUser(user).then((response) => {
        window.location.reload();
      });
    }
  }

  cancelAppointment(id) {
    this.appointmentService.cancelAppointment(id, this.accessToken)
    .then((response) => {
      this.isAppointment = false;
      window.location.reload();
    });
  }

}
