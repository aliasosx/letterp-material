import { MdcSnackbar } from '@angular-mdc/web';
import { AuthenticationService } from './../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Form, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private snackbar: MdcSnackbar, private dataService: DataService, ) { }
  userlogin: string;
  loggedIn: boolean = false;
  loginForm: FormGroup;
  /* Snackbar */
  snackBarMsg: string = 'test snack bar';
  action = 'OK';
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;

  ngOnInit() {

    this.loginForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });

    /* Load login */
    let token = localStorage.getItem('token');
    if (token) {
      this.authService.getTokenDecode({ 'token': token }).subscribe(result => {
        console.log(result);
        if (result['payload']) {
          this.router.navigateByUrl('');
        } else {
          this.router.navigateByUrl('**');
        }
      });
    }
  }

  login() {
    const loginData = {
      'user': {
        'username': this.loginForm.get('username').value,
        'password': this.loginForm.get('password').value
      }
    }
    this.authService.getlogin(loginData).subscribe(result => {
      if (result['status'] === 'Success') {
        this.userlogin = result['token'];
        localStorage.setItem('token', this.userlogin);
        try {
          this.dataService.getCurrentUserSession().then(user => {
            this.addAuditUser(user[0].emp_id, 'User login success');
            location.reload();
          });
        } catch (err) {
          location.reload();
        }

        //this.setLocalStorage(this.userlogin);
        //location.reload();
        //this.router.navigateByUrl('');
      } else {
        this.addAuditUser(this.loginForm.get('username').value, 'User login fail attempt');
        this.showSnackbar('Username or Password incorrect ')
      }
    });
  }

  showSnackbar(msg) {
    if (msg) {
      this.snackBarMsg = msg;
    }

    const snackbarRef = this.snackbar.show(this.snackBarMsg, this.action, {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });
  }
  addAuditUser(emp_id, message) {
    this.dataService.auditUser({
      'user': {
        'emp_id': emp_id,
        'activity': message
      }
    }).then(console.log);
  }
}
