import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MdcDialog } from '@angular-mdc/web';
import { FirstloginComponent } from 'src/app/dialogs/firstlogin/firstlogin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService, private dataService: DataService, private dialog: MdcDialog) {
    this.reportByCat = dataService.getReportByCat();
    this.reportRevByKitchen = dataService.getReportRevByKitchen();
  }
  title: string;
  token: string;
  reportByCat: Promise<any>;
  reportRevByKitchen: Promise<any>;

  currentUserSession: any;
  ngOnInit() {
    this.title = 'Data still loading';
    this.token = localStorage.getItem('token');

    this.auth.getTokenDecode({
      'token': this.token
    }).subscribe(result => {
      if (result) {
        this.title = "Letterp Welcome ";
        this.dataService.getCurrentUserSession().then(userInfo => {
          let firstLogin = userInfo[0].first_login;
          if (firstLogin === 1) {
            const dialogRef = this.dialog.open(FirstloginComponent, {
              escapeToClose: false,
              clickOutsideToClose: false,
              scrollable: false
            });
            dialogRef.afterClosed().subscribe(result => {
              if (result['status'] === 'success') {
                alert('Password has been changed');
              } else {
                alert('Error happening Please contact admin');
              }
            });
          }

        });
        //this.loadReports();
      } else {
        this.router.navigateByUrl('login');
      }
    });

  }
  loadReports() {
    this.dataService.getReportByCat().then(res => {
      this.reportByCat = res;
      console.log(res);
    });
  }
}
