import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { UserEditComponent } from 'src/app/dialogs/user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, private snackbar: MdcSnackbar) { }
  users: any;

  /* Snackbar */
  snackBarMsg: string = 'test snack bar';
  action = 'OK';
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }
  addUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.showSnackbar('Add user successful');
      } else {
        this.showSnackbar('Add user Cancelled');
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
    this.getUsers();
    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }
  deleteUser(id) {
    if (id) {
      this.dataService.deleteUser(id).subscribe(result => {
        if (result['status'] == 'success') {
          this.showSnackbar('User delete successfull');
        } else {
          this.showSnackbar('Something went wrong!');
        }
      });
    }
  }
  updateUser(user) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      scrollable: true,
      data: user
    });
  }
}

