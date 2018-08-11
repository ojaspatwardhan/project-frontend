import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceClient } from '../services/user.service.client';
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
  validUser;
  loggedIn;
  errorMessage;
  password;
  confirmPassword;
  cookieValue = "";

  constructor(private service: UserServiceClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get("username");
    var mapProp = {
      center: new google.maps.LatLng(19.107280, 72.852060),
      zoom: 18,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(19.107280, 72.852060),
    map: this.map,
    animation: google.maps.Animation.DROP
  });
  this.marker.setMap(this.map);
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
