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

  ngOnInit() {
  }

}
