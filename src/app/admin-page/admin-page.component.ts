import { Component, OnInit } from '@angular/core';
import { AppointmentServiceClient } from '../services/appointment.service.client';
import { UserServiceClient } from '../services/user.service.client';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  //Access Token
  accessToken;

  //Appointments Arrays
  initialAppointments = [];
  confirmedAppointments = [];
  allAppointments = [];

  //Customers Array
  customers = [];

  //Users Array
  users = [];

  //Search
  searchText;
  statusText;

  //Cookie
  cookieValue = "";

  constructor(private service: AppointmentServiceClient, private userService: UserServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.service.getAccessToken().then((response) => {
      this.cookieValue = this.cookieService.get("username");
      this.accessToken = response.access_token;
      this.getInitialAppointments();
      this.getConfirmedAppointments();
      this.getCustomers();
      this.getUsers();
      this.getAppointments();
    });
  }

  //Get IN status Appointments
  getInitialAppointments() {
    this.service.getInitialAppointments(this.accessToken).then((initialAppointments) => {
      this.initialAppointments = initialAppointments.data;
      console.log(this.initialAppointments);
    });
  }

  //Get RS status appointments
  getConfirmedAppointments() {
  this.service.getConfirmedAppointments(this.accessToken).then((confirmedAppointments) => {
    this.confirmedAppointments = confirmedAppointments.data;
    console.log(this.confirmedAppointments);
  });
}

  //Get all appointments
  getAppointments() {
  this.service.getAppointments(this.accessToken)
  .then((appointments) => {
    this.allAppointments = appointments.data;
  });
}

  cancelAppointment(id) {
    this.service.cancelAppointment(id, this.accessToken)
    .then((response) => {
      this.getAppointments();
    });
  }

  deleteAppointment(id, status) {
    if(status == "CN") {
      alert("Appointment has already been cancelled");
    }
    else {
      this.service.deleteAppointment(id, this.accessToken)
      .then((response) => {
        this.getAppointments();
      });
    }
  }

  getCustomers() {
    this.service.getCustomers(this.accessToken)
    .then((customers) => {
      this.customers = customers.data;
      console.log(this.customers);
    });
  }

  getUsers() {
    this.userService.findAllUsers()
    .then((users) => {
      this.users = users;
    });
  }

  deleteUser(id) {
    this.userService.removeUser(id).then((response) => {
      this.getUsers();
    });
  }

  logout() {
    this.cookieService.delete("username");
    this.userService.logout().then(() => this.router.navigate(['home']));
  }

  isLoggedIn() {
    if(this.cookieValue != "") {
      this.router.navigate(['make-appointment']);
    }
    else {
      alert("Please Log in to schedule an appointment");
    }
  }

  showCustomersModal() {
    $("#customersModal").modal("toggle");
  }

  showUsersModal() {
    $("#usersModal").modal("toggle");
  }

}
