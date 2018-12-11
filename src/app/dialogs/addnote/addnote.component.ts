import { FormGroup } from '@angular/forms';
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, private dialogRef: MdcDialogRef<AddnoteComponent>) { }
  addNoteForm: FormGroup;
  ngOnInit() {
    
  }
}
