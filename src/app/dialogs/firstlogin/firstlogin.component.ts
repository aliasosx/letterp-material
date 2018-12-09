import { Component, OnInit } from '@angular/core';
import { MdcDialogRef } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss']
})
export class FirstloginComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<FirstloginComponent>, private dataService: DataService, ) { }
  changePassword: FormGroup;
  alertClass = "hidden";
  buttonSave: boolean = true;
  ngOnInit() {
    this.changePassword = new FormGroup({
      'password': new FormControl(),
      'confirmPassword': new FormControl()
    });

  }
  passwordChk(event) {
    if (event != this.changePassword.get('password').value) {
      this.alertClass = "alert alert-warning alert-dismissible fade show";
      this.buttonSave = true;
    } else {
      this.alertClass = "hidden";
      this.buttonSave = false;
    }

  }
  doChangePassword() {
    if (this.changePassword.get('password').value) {

      this.dataService.getCurrentUserSession().then(currentUser => {
        //console.log(currentUser[0].emp_id);
        let user = {
          'user': {
            'emp_id': currentUser[0].emp_id,
            'password': this.changePassword.get('password').value,
          }
        };
        this.dataService.changePasswordByEmpId(user).then(result => {
          if (result['status'] === 'success') {
            this.dataService.auditUser({
              'user': {
                'emp_id': currentUser[0].emp_id,
                'activity': 'First time login and change password ',
              }
            }).then(response => {
              console.log(response);
              this.dialogRef.close(result);
            });

          }
        });
      });
    } else {
      alert('Password cannot be empty');
    }


  }

}
