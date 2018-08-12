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
  queryText = "";

  constructor(private emailService: EmailServiceClient) { }

  ngOnInit() {
  }

  //Query Email
  sendQuery() {
  this.emailService.sendQueryEmail(this.email, this.queryText).then((response) => {
    window.location.reload();
  });
}

}
