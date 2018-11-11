import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FoodType } from '../../models/foottype';
import { DataService } from 'src/app/services/data.service';
import { MdcDialogRef, MdcSnackbar, MdcDialog } from '@angular-mdc/web';

@Component({
  selector: 'app-addfoodtype',
  templateUrl: './addfoodtype.component.html',
  styleUrls: ['./addfoodtype.component.scss']
})

export class AddfoodtypeComponent implements OnInit {
  addFoodTypeGroup: FormGroup;
  foodType: FoodType;

  /* Snackbar */
  snackBarMsg: string = "test snack bar";
  action = "OK";
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;
  constructor(public dialogRef: MdcDialogRef<AddfoodtypeComponent>, private dataService: DataService, private snackbar: MdcSnackbar, private dialog: MdcDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.addFoodTypeGroup = new FormGroup({
      FoodType: new FormControl(),
      FoodTypeDescription: new FormControl(),
      FoodTypeDescription_la: new FormControl()
    });
  }
  addFoodType() {
    this.foodType = this.addFoodTypeGroup.value;
    this.dataService.createFoodType(this.foodType).subscribe(result => {
      console.log(result);
      if (result['status'].code) {
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
  onChange(value): void {

  }

}
