import { FormGroup, FormControl } from '@angular/forms';
import { AddUserComponent } from './../add-user/add-user.component';
import { MdcDialog, MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<UserEditComponent>, private dataService: DataService, @Inject(MDC_DIALOG_DATA) public data: UserEditComponent) { }
  updateUserform: FormGroup;
  photoPath: any;
  roles: any;
  user: any;
  gr: string;
  role: string;
  genders: any = [
    { 'gender_code': 'M', 'gender': 'Mr.' },
    { 'gender_code': 'F', 'gender': 'Ms.' },
  ];

  ngOnInit() {
    this.updateUserform = new FormGroup({
      'gender': new FormControl(),
      'fullname': new FormControl(),
      'username': new FormControl(),
      'email': new FormControl(),
      'photo': new FormControl(),
      'dateofbirth': new FormControl(),
      'current_address': new FormControl(),
      'mobile': new FormControl(),
      'password': new FormControl(),
      'password_confirmation': new FormControl(),
      'role_code': new FormControl(),
    });

    this.user = this.data;
    this.photoPath = this.data['photo']
    this.getRoles();
    this.gr = this.data['gender'];
    this.role = this.data['role_code']
  }
  updateUser() {

  }
  onFileChange(e) {

  }
  getRoles() {
    this.dataService.getRoles().subscribe(roles => this.roles = roles);
  }

}
