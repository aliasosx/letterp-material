import { FormGroup, FormControl } from '@angular/forms';
import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, private dialogRef: MdcDialogRef<AddnoteComponent>, @Inject(MDC_DIALOG_DATA) data: string) {
    this.food_id = data;
  }
  addNoteForm: FormGroup;
  food_id: string;
  ngOnInit() {
    this.addNoteForm = new FormGroup({
      'extraNote': new FormControl(),

    });
  }
  addNote() {
    let data = {
      'note': this.addNoteForm.get('extraNote').value,
      'foodid': this.food_id,
    }
    this.dialogRef.close(data);
  }
}
