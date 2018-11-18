import { Component, OnInit } from '@angular/core';
import { MdcDialogRef, MdcSnackbar, MdcDialog } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.scss']
})
export class PaymentConfirmComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<PaymentConfirmComponent>, private dataService: DataService, private snackbar: MdcSnackbar, private dialog: MdcDialog) { }

  ngOnInit() {
  }

}
