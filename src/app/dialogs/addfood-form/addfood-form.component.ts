import { Component } from '@angular/core';
import { MdcDialogRef } from '@angular-mdc/web';

@Component({
  selector: 'app-addfood-form',
  templateUrl: './addfood-form.component.html',
  styleUrls: ['./addfood-form.component.scss']
})
export class AddfoodFormComponent {
  constructor(public dialogRef: MdcDialogRef<AddfoodFormComponent>) { }
}
