
import { environment } from './../../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, private dialogRef: MdcDialogRef<AddUserComponent>) { }
  addUserform: FormGroup;
  roles: any;
  photoPath: any = "../../../assets/images/No_Image_Available.gif";
  file: File;

  env = environment.userImageUrl;

  ngOnInit() {
    this.addUserform = new FormGroup({
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
    this.getRole();
  }
  addnewUser() {
    if (this.addUserform) {
      if (this.addUserform.get('password').value == this.addUserform.get('password_confirmation').value) {
        let user = {
          "user": {
            "gender": this.addUserform.get('gender').value,
            "fullname": this.addUserform.get('fullname').value,
            "username": this.addUserform.get('username').value,
            "email": this.addUserform.get('email').value,
            "photo": this.file.name,
            "dateofbirth": this.addUserform.get('dateofbirth').value,
            "current_address": this.addUserform.get('current_address').value,
            "mobile": this.addUserform.get('mobile').value,
            "password": this.addUserform.get('password').value,
            "role_code": this.addUserform.get('role_code').value,
          }
        };

        if (this.file) {
          const uploadData = new FormData();
          uploadData.append('image', this.file, this.file.name);
          this.dataService.uploadUserPhoto(uploadData).subscribe(data => {
            console.log(data);
            if (data['status'] == 'success') {
              this.dataService.addUser(user).subscribe(result => {
                if (result['status'] == 'success') {
                  this.dialogRef.close('success');
                } else {
                  console.log(result);
                  return;
                }
              });
            } else {
              console.log(data);
              return;
            }
          });

        } else {
          alert('Please select file to upload ');
        }
      } else {
        alert('Password mismatch');
      }
    }
  }
  getRole() {
    this.dataService.getRoles().subscribe(roles => this.roles = roles);
  }
  onFileChange(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.photoPath = (<FileReader>event.target).result;
    }
    console.log(this.file);
  }

}
