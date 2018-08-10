import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  cookieValue = "";

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get("username");
  }

}
