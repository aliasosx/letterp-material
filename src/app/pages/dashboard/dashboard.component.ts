import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) { }
  title: string;
  token: string;
  ngOnInit() {
    this.title = 'Letter-p';
    this.token = localStorage.getItem('token');

    this.auth.getTokenDecode({
      'token': this.token
    }).subscribe(result => {
      if (result) {
        this.title = "Letterp Welcome " + result['payload'];

      } else {
        this.router.navigateByUrl('login');
      }
    });

  }
}
