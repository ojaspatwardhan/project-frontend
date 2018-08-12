import { Component, OnInit } from '@angular/core';
import { EmailServiceClient } from '../services/email.service.client';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {

  //Query Variables
  email = "";

  constructor(private emailService: EmailServiceClient) { }

  ngOnInit() {
  }

  //Query Email
  sendQuery() {
  this.emailService.sendGetInTouchEmail(this.email).then((response) => {
    window.location.reload();
  });
}

}
