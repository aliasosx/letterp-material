import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MdcSnackbar, MdcDialog, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/models/item';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.scss']
})
export class PaymentConfirmComponent implements OnInit {
  items: Item;
  data: any;
  customer: any;
  changeAmt: number = 0;
  recvAmt: number = 0;
  disbledItem: boolean;
  qTag: any;
  orderForm: FormGroup;
  qTagUsed: number;
  paymentReadyOff: boolean = true;


  /* Snackbar */
  snackBarMsg: string = "test snack bar";
  action = "OK";
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;

  constructor(public dialogRef: MdcDialogRef<PaymentConfirmComponent>,
    private dataService: DataService, private snackbar: MdcSnackbar,
    private dialog: MdcDialog, @Inject(MDC_DIALOG_DATA) data: Item) {
    this.data = data;
  }

  ngOnInit() {

    this.orderForm = new FormGroup({
      'food_id': new FormControl(),
      'qtag': new FormControl(),

    });


    this.items = this.data['items'];
    this.customer = this.data['customer'];
    this.loadQTag();
    //console.log(this.data);
  }
  loadQTag() {
    this.dataService.getQTags().subscribe(qTag => this.qTag = qTag);
  }
  paymentExecute(recvAmt, changeAmt) {
    //make Json Order
    let changeAmtNumber: number = changeAmt.replace(',','');
    if(changeAmtNumber < 0) {
      this.showSnackbar('Money not enought!!!');
    } else {
          let order = {
                'order': {
                  'customer': this.customer,
                  'recipt_printed': 1,
                  'paid': 1,
                  'qtag': this.qTagUsed,
                  'total': this.data.total,
                  'discount': this.data.discount,
                  'tax': this.data.tax,
                  'grandtotal': this.data.grandtotal,
                  'user_code': 'E4F43B3284BF3F9065CC5EB6A46F2514',
                  'items': this.items,
                  'recieved' : recvAmt,
                  'change': changeAmt.replace(',',''),
                }
              };

              this.dataService.createOrder(order).subscribe(result => {
                try {
                  console.log(result);
                  if (result['status'] == 'success') {
                    localStorage.removeItem('cart');
                    this.dialogRef.close('Success');
                  } else {
                    console.log(result);
                  }
                } catch (err) {
                  console.log(err);
                }

              });
    }
  }
  qSelected(e, tag) {
    this.qTagUsed = parseInt(tag);
    //console.log(this.qTagUsed);
  }
  onRecvChange($event, v){
    console.log(v);
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
    snackbarRef.afterDismiss().subscribe(() => {
      //console.log('The snack-bar was dismissed')
    });
  }

}
