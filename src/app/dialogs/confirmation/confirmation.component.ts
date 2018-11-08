import { Component, NgModule } from '@angular/core';
import {  MdcDialogRef,MdcDialog } from '@angular-mdc/web';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent  {

  constructor(public dialogRef: MdcDialogRef<ConfirmationComponent>) { }


}
