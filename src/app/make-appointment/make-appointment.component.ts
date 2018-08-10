import { Component, OnInit } from '@angular/core';
import { AppointmentServiceClient } from '../services/appointment.service.client';
import { UserServiceClient } from '../services/user.service.client';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model.client';
import { Router } from '@angular/router';
import flatpickr from 'flatpickr';
import * as moment from 'moment';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {

  //Date variables
  startDateTime;
  endDateTime;
  tempString;
  tempStringArray;
  oldMinutes;
  newMinutes;
  oldHour;
  newHour;
  tempArray;
  newTempArray;
  finalEndDateTime;
  finalStartDateTime;

  //Customer variables
  phone;
  fullName;
  email;
  firstName;
  lastName;
  appointmentId;

  //Other variables
  slotIsAvailable = false;
  accessToken = "";
  cookieValue = "";
  userId;
  user: User = new User();

  constructor(private router: Router, private service: AppointmentServiceClient, private userService: UserServiceClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.service.getAccessToken().then((response) => {
      this.accessToken = response.access_token;
      this.userId = this.cookieService.get("id");
    });
    flatpickr("#picker1", {
      dateFormat: "Y-m-dTH:i:ss",
      altInput: true,
      altFormat: "F j, Y, h:i K",
      enableTime: true,
      minDate: "today",
      // maxDate: new Date().fp_incr(7),
      minTime: "09:00",
      maxTime: "20:30",
      minuteIncrement: 30
    });
    this.cookieValue = this.cookieService.get("username");
  }

  createAppointment() {
    this.startDateTime = moment(this.startDateTime).format();
    this.endDateTime = moment(this.startDateTime).add(30, "m").format();
    // this.tempStringArray = this.startDateTime.split(":");
    // this.oldMinutes = +this.tempStringArray[1];
    // if(this.oldMinutes == 30) {
    //   this.tempStringArray[1] = "00";
    //   this.newHour = +this.tempStringArray[0].split("T")[1] + 1;
    //   this.tempArray = this.tempStringArray[0].split("T");
    //   this.tempArray[1] = "T" + this.newHour;
    //   this.newTempArray = this.tempArray.join("");
    //   this.tempStringArray[0] = this.newTempArray;
    //   this.finalEndDateTime = this.tempStringArray.join(":");
    // }
    // else {
    //   this.newMinutes = this.oldMinutes + 30;
    //   this.tempStringArray[1] = String(this.newMinutes);
    //   this.finalEndDateTime = this.tempStringArray.join(":")
    // }
    this.service.createAppointment(this.accessToken, this.startDateTime, this.endDateTime)
    .then((appointment) => {
      if(appointment != null) {
        this.slotIsAvailable = true;
        this.appointmentId = appointment.id;
        alert("Selected slot is available, please click on confirm booking to confirm your appointment.")
      }
      else {
        alert("The selected time is not available, please select a different date/ time");
      }
    });
  }

  confirmAppointment() {
    this.fullName = this.firstName + " " + this.lastName;
    this.service.confirmAppointment(this.accessToken, this.appointmentId, this.fullName, this.firstName, this.lastName, this.email, this.phone)
    .then(() => {
      this.userService.findUserById(this.userId).then((user) => {
        this.user = user;
        this.user.appointmentId = this.appointmentId;
        this.userService.updateUser(this.user).then(() => {
          $("#confirmAppointmentModal").modal("toggle");
          this.router.navigate(['profile']);
        });
      });
    });
  }

  logout() {
    this.cookieService.delete("username");
    this.userService.logout().then(() => this.router.navigate(['home']));
  }

  getServices() {
    this.service.getServices(this.accessToken);
  }

  getResources() {
    this.service.getResources(this.accessToken);
  }

  getCustomFields() {
    this.service.getCustomFields(this.accessToken);
  }

  checkAvailability() {
    this.service.checkAvailability(this.accessToken);
  }

}
