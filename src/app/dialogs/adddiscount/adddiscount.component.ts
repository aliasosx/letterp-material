import { Component, OnInit } from '@angular/core';
import { MdcDialogRef, MdcSnackbar, MdcDialog } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-adddiscount',
  templateUrl: './adddiscount.component.html',
  styleUrls: ['./adddiscount.component.scss']
})
export class AdddiscountComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<AdddiscountComponent>, private dataService: DataService, private snackbar: MdcSnackbar, private dialog: MdcDialog) { }
  addDiscountFormGroup: FormGroup;
  discount: any;
  foods: any;
  /* Snackbar */
  snackBarMsg: string = "test snack bar";
  action = "OK";
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;

  ngOnInit() {
    this.addDiscountFormGroup = new FormGroup({
      'food_id': new FormControl(),
      'discount_percentage': new FormControl(),
      'valid_until': new FormControl(),
      'status': new FormControl()
    });
    this.getFoods();
  }
  addnewDiscount() {
    this.discount = this.addDiscountFormGroup.value;
    this.dataService.createDiscount(this.discount).subscribe(result => {
      console.log(result);
      if (result['status']) {
        this.showSnackbar(result['status'].sqlMessage);
      } else {
        this.dialogRef.close('Success');
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
    snackbarRef.afterDismiss().subscribe(() => {
      //console.log('The snack-bar was dismissed')
    });
  }
  getFoods() {
    this.dataService.getFoodByNoDiscount().subscribe(foods => {
      this.foods = foods;
    });
  }
}
