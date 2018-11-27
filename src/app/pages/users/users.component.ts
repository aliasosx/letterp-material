import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MdcDialog } from '@angular-mdc/web';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog) { }
  users: any;
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
      console.log(result);
    });
  }

}
