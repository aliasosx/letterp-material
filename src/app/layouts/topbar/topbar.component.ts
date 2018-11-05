import { Component, OnInit } from '@angular/core';
import { MdcDrawer, MdcButton } from '@angular-mdc/web';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  nowdate: Date;
  constructor(private router: Router, private auth: AuthenticationService, private dataService: DataService) {
    setInterval(() => {
      this.nowdate = new Date();
    });
  }
  token: string;
  username: string;
  payload: string;
  tokenResponse: any;
  menus: any;
  menuclass: string;
  ativeMenu: string;
  title: string;
  drawerDismissible: MdcDrawer;
  ngOnInit() {
    this.title = ''/*'Letterp Restaurant'*/;
    this.token = localStorage.getItem("token");
    if (!this.token) {
      this.router.navigateByUrl("login");
    }
    this.auth.getTokenDecode({
      "token": this.token
    }).subscribe(data => {
      if (data) {
        this.tokenResponse = data;
        this.username = this.tokenResponse.payload.split("|")[0];
        this.getmenus();
        this.getCompany();
      }
    });
  }
  getmenus() {
    //this.menuclass = "nav-item active";
    console.log(this.router.url)
    if (this.token) {
      this.dataService.getMenu().subscribe(data => {
        this.menus = data;
      });
    }
  }
  getCompany() {
    if (this.token) {
      this.dataService.getCompany(
        {
          "company": {
            "id": "1"
          }
        }
      ).subscribe(data => {
        this.title = data[0].company_name;
      });
    }
  }
}