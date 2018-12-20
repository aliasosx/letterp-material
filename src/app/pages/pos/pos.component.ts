import { AddnoteComponent } from './../../dialogs/addnote/addnote.component';

import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Food } from '../../models/food';
import { Item } from 'src/app/models/item';
import { MdcDialog, MDC_DIALOG_DATA, MdcSnackbar, MdcMenu, MdcMenuSurfaceAnchor } from '@angular-mdc/web';
import { CustomersComponent } from 'src/app/dialogs/customers/customers.component';
import { PaymentConfirmComponent } from 'src/app/dialogs/payment-confirm/payment-confirm.component';
import { environment } from 'src/environments/environment';
import { SubtypeFoodSelectComponent } from 'src/app/dialogs/subtype-food-select/subtype-food-select.component';



@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, private snackbar: MdcSnackbar) { }
  food_types: any;
  foods: any;
  foodCateId: string;
  paymentReady: boolean = false;
  url = environment.imageUrl;
  itemCheckClass = "hiddenDiv";
  emptyClass = "empty-icon";
  /* Snackbar */
  snackBarMsg: string = "test snack bar";
  action = "OK";
  multiline = true;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;
  searchField: string = "food_name"
  searchtxt: any;

  customer: any = {
    'id': '-1',
    'gender': 'M',
    'fullname': 'ບໍ່ມີຂໍ້ມູນ',
    'mobile': 'ບໍ່ມີຂໍ້ມູນ'
  };


  menuItems = [
    { label: "Flights" },
    { label: "Hotel" },
    { label: "Favorites" },
    { label: "Review Activity" }
  ];

  total: number = 0;
  items: Item[] = [];
  tax: number = 0;
  tax_rate: number = 0;
  discount: number = 0;
  discount_rate: number = 0;
  grandTotal: number = 0;

  displayElement = "text-center display-4";
  ngOnInit() {
    this.foodCateId = "ທັງໝົດ";
    this.getFoodtype();
    this.getFoods();

    this.loadCart();
    this.checkPayment();
  }
  getFoodtype() {
    this.dataService.getFoodTypeHasFood().subscribe(food_type => {
      this.food_types = food_type;
    });
  }


  getFoodTypeByName(typeName) {
    this.dataService.getFoodTypeByName({
      'foodtype': {
        'food_type_desc_la': typeName
      }
    }).then(result => {
      this.foodCateId = result[0].id;
      this.getFoods();
    });
  }
  getFoods() {
    if (this.foodCateId == "ທັງໝົດ") {
      this.dataService.getFoods().subscribe(foods => {
        if (foods) {

          this.foods = foods;
          this.displayElement = "hiddenDiv";
        } else {
          this.displayElement = "text-center display-4";
        }
      });
    } else {
      this.dataService.getFoodByCategory(this.foodCateId).subscribe(foods => {
        if (foods) {

          this.foods = foods;
          this.displayElement = "hiddenDiv";
        } else {
          this.displayElement = "text-center display-4";
        }
      });
    }
  }
  onClickCategory(catid) {
    if (catid.tab.label == "ທັງໝົດ") {
      this.foodCateId = "ທັງໝົດ";
      this.getFoods();
    } else {
      this.getFoodTypeByName(catid.tab.label);
    }
  }
  addItemToCard(food: Food, note) {

    if (food && !food.enabled_subtype) {
      let items: Item = {
        food: food,
        quantity: 1,
        note: note,
      };

      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(items));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = JSON.parse(cart[i]);
          if (item.food.id == food.id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(JSON.stringify(items));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let item: Item = JSON.parse(cart[index]);
          item.quantity += 1;
          cart[index] = JSON.stringify(item);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
      this.loadCart();
    } else {
      // call subFoodDialog
      let subFoodDialogRef = this.dialog.open(SubtypeFoodSelectComponent, {
        escapeToClose: true,
        clickOutsideToClose: true,
        data: food
      });
      subFoodDialogRef.afterClosed().subscribe(res => {
        console.log(res);
      });
      this.loadCart();
    }
  }

  loadCart() {
    this.total = 0;
    this.grandTotal = 0;
    this.items = [];
    this.emptyClass = "empty-icon";

    if (localStorage.getItem('cart') == null) {
      this.emptyClass = "empty-icon";
      return;
    } else if (localStorage.getItem('cart').length == 2) {
      this.emptyClass = "empty-icon";
      return;
    }
    if (localStorage.getItem('cart') != null) {
      this.emptyClass = "hideEmpty";
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          food: item.food,
          quantity: item.quantity,
          note: item.note,
        });
        this.total += item.food.price * item.quantity;
        this.discount = (this.total * this.discount_rate) / 100;
        this.tax = (this.total * this.tax_rate) / 100;
        this.grandTotal = this.total - this.discount + this.tax;
      }
    }

    this.checkPayment();
  }

  checkPayment() {
    let items = JSON.parse(localStorage.getItem('cart'));

    if (items.length > 0) {
      this.paymentReady = true;
    } else {
      this.paymentReady = false;
    }
    //console.log(this.paymentReady);
  }

  removeCardItem(id: number) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index = -1;

    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.food.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
    this.checkPayment();
  }

  callCustomerDialog() {
    const customerDialogRef = this.dialog.open(CustomersComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    customerDialogRef.afterClosed().subscribe(customer => {
      if (customer != 'close') {
        this.customer = customer;
        this.callPaymentdialog();
        this.checkPayment();

      }
    });
  }
  callPaymentdialog() {
    console.log(this.customer);
    if (this.customer.id == -1) {
      this.callCustomerDialog();
      return;
    }
    const paymentDialogRef = this.dialog.open(PaymentConfirmComponent, {
      escapeToClose: true,
      clickOutsideToClose: false,
      data: {
        'items': this.items,
        'total': this.total,
        'tax': this.tax,
        'discount': this.discount,
        'grandtotal': this.grandTotal,
        'customer': this.customer,
      },
    });
    paymentDialogRef.afterClosed().subscribe(msg => {
      //console.log(msg);
      if (msg == 'Success') {
        this.tax = 0;
        this.total = 0;
        this.discount = 0;
        this.grandTotal = 0;
        this.loadCart();
        this.paymentReady = false;
        this.showSnackbar('Payment successful and Order in progressing ...')
      } else {
        this.showSnackbar('Cancelled');
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
    this.getFoods();
    snackbarRef.afterDismiss().subscribe(() => {
      //console.log('The snack-bar was dismissed')
    });
  }
  logTab(event) {
    console.log(event);
  }
  callAddNoteDialog(foodId) {
    const addNoteFormRef = this.dialog.open(AddnoteComponent, {
      escapeToClose: true,
      clickOutsideToClose: false,
      data: foodId,
    });
    addNoteFormRef.afterClosed().subscribe(data => {
      if (data != 'close') {
        this.addNoteToItem(data);
      }
    });
  }
  addNoteToItem(data) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    //console.log(cart.length);
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.food.id == data.foodid) {
        index = i;
        break;
      }
    }
    let item: Item = JSON.parse(cart[index]);
    item.note = data.note;
    cart[index] = JSON.stringify(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }
  getSearchByFoodname(txt) {
    console.log(txt);
  }
  onMenuSelect() {
    console.log();
  }
}
