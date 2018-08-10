import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SymptomCheckerServiceClient } from '../services/symptom-checker.service.client';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
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

  constructor(@Inject(SESSION_STORAGE) private storageService: WebStorageService, private cookieService: CookieService, private symptomCheckerService: SymptomCheckerServiceClient) { }

  //Session variables
  cookieValue = "";

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

  ngOnInit() {
    this.cookieValue = this.cookieService.get("username");
    this.computedHash = crypto.HmacMD5(this.uri, this.secretKey);
    this.computedHashString = this.computedHash.toString(crypto.enc.Base64);
    this.symptomCheckerService.getToken(this.apiKey, this.computedHashString)
    .then((response) => {
      this.token = response.Token;
      this.getSymptoms();
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
  if(gender == "Male" || gender == "male") {
    this.genderValue = "Male";
    this.inputFlag = true;
  }
  else if(gender == "Female" || gender == "female") {
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

}
