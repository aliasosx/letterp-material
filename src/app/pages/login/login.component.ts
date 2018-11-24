import { MdcSnackbar } from '@angular-mdc/web';
import { AuthenticationService } from './../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Form, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private snackbar: MdcSnackbar) { }
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
      'email': new FormControl(),
      'password': new FormControl()
    });

    /* Load login */

    this.userlogin = localStorage.getItem('token');
    console.log(this.userlogin);
    if (this.userlogin) {
      this.authService.getTokenDecode({
        'token': this.userlogin
      }).subscribe(result => {
        if (result['payload']) {
          this.router.navigateByUrl('/');
        }
      });
    }
  }

  login() {
    const loginData = {
      'user': {
        'email': this.loginForm.get('email').value,
        'password': this.loginForm.get('password').value
      }
    }
    this.authService.getlogin(loginData).subscribe(result => {
      console.log(result);

      if (result['status'] === 'Success') {
        this.userlogin = result['token'];
        localStorage.setItem('token', this.userlogin);
        this.router.navigateByUrl('');
      } else {
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
}
