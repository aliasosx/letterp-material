import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MdcSnackbar, MdcDialog, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/models/item';
@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.scss']
})
export class PaymentConfirmComponent implements OnInit {
  items: Item;
  data: any;
  customer: any;
  constructor(public dialogRef: MdcDialogRef<PaymentConfirmComponent>,
    private dataService: DataService, private snackbar: MdcSnackbar,
    private dialog: MdcDialog, @Inject(MDC_DIALOG_DATA) data: Item) {
    this.data = data;
  }

  ngOnInit() {
    this.items = this.data['items'];
    this.customer = this.data['customer'];
    console.log(this.data);
  }

}
