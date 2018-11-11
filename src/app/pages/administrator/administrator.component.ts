import { Component, OnInit } from '@angular/core';
import { MdcTabActivatedEvent, MdcDialog, MdcSnackbar } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { AddfoodtypeComponent } from 'src/app/dialogs/addfoodtype/addfoodtype.component';
import { ConfirmationComponent } from 'src/app/dialogs/confirmation/confirmation.component';
import { AdddiscountComponent } from 'src/app/dialogs/adddiscount/adddiscount.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MdcDialog, private snackbar: MdcSnackbar) { }
  foodTypeClass = "main-card";
  DiscountClass = "main-card";
  CurrencyClass = "main-card";

  foodtypes: any;
  discounts: any;

  /* Snackbar */
  snackBarMsg: string = "test snack bar";
  action = "OK";
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;

  ngOnInit() {
    this.getFoodTypes();
    this.getDiscounts();
  }
  hideallCards() {
    this.CurrencyClass = "hiddenElement";
    this.DiscountClass = "hiddenElement";
    this.foodTypeClass = "hiddenElement";
  }

  logTab(e: MdcTabActivatedEvent) {
    console.log(e);
    console.log(e.tab.label);
    switch (e.tab.label.toLowerCase()) {
      case "foods type": {
        this.hideallCards();
        this.foodTypeClass = "main-card";
        break;
      }
      case "discount": {
        this.hideallCards();
        this.DiscountClass = "main-card";
        break;
      }
      case "currency": {
        this.hideallCards();
        this.CurrencyClass = "main-card";
        break;
      }
    }
  }
  getFoodTypes() {
    this.dataService.getFoodTypes().subscribe(foodtypes => {
      this.foodtypes = foodtypes;
    });
  }

  getDiscounts() {
    this.dataService.getDiscounts().subscribe(discounts => {
      console.log(discounts);
      this.discounts = discounts;
    });
  }
  addnewDialog() {
    const dialogRef = this.dialog.open(AddfoodtypeComponent, {
      escapeToClose: true,
      clickOutsideToClose: false,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackbar('ປະເພດອາຫານຖືກບັນທຶກແລ້ວ');
        this.getFoodTypes();
      }
    });
  }
  deleteFoodType(id) {
    this.dataService.deleteFoodType(id).subscribe(result => {
      this.showSnackbar('ປະເພດອາຫານຖືກລຶບແລ້ວ')
      this.getFoodTypes();
    })
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
  showConfirmationDelete(id) {
    const confirmDialogRef = this.dialog.open(ConfirmationComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result == 'accept') {
        this.deleteFoodType(id);
      } else {
        this.showSnackbar('ລາຍການຖືກຍົກເລີກ');
      }
    });
  }

  showConfirmationDeleteDiscount(id) {
    const confirmDialogRef = this.dialog.open(ConfirmationComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result == 'accept') {
        this.deleteDiscount(id);
      } else {
        this.showSnackbar('ລາຍການຖືກຍົກເລີກ');
      }
    });
  }

  deleteDiscount(id) {
    this.dataService.deleteDiscount(id).subscribe(result => {
      console.log(result);
      this.showSnackbar('ສ່ວນຫຼູດຖືກລຶບແລ້ວ')
      this.getDiscounts();
    });
  }
  addnewDiscount() {
    const dialogRef = this.dialog.open(AdddiscountComponent, {
      escapeToClose: true,
      clickOutsideToClose: false,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'close') {
        this.showSnackbar('ສ່ວນຫຼຸດ ຖືກບັນທຶກແລ້ວ');
        this.getDiscounts();
      } else {
        this.showSnackbar('ຍົກເລີກ');
        this.getDiscounts();
      }
    });
  }

}
