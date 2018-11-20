import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Food } from '../../models/food';
import { Item } from 'src/app/models/item';
import { MdcDialog, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { CustomersComponent } from 'src/app/dialogs/customers/customers.component';
import { PaymentConfirmComponent } from 'src/app/dialogs/payment-confirm/payment-confirm.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, ) { }
  food_types: any;
  foods: any;
  foodCateId: string;
  paymentReady: boolean;
  customer: any = {
    'id': '-1',
    'gender': 'M',
    'fullname': 'ບໍ່ມີຂໍ້ມູນ',
    'mobile': 'ບໍ່ມີຂໍ້ມູນ'
  };


  total: number = 0;
  items: Item[] = [];
  tax: number = 0;
  tax_rate: number = 7;
  discount: number = 0;
  discount_rate: number = 10;
  grandTotal: number = 0;

  displayElement = "text-center display-4";
  ngOnInit() {
    this.foodCateId = "all";
    this.getFoodtype();
    this.getFoods();

    this.loadCart();
    this.checkPayment();
  }
  getFoodtype() {
    this.dataService.getFoodTypes().subscribe(food_type => {
      this.food_types = food_type;
    });
  }
  getFoods() {
    if (this.foodCateId == "all") {
      this.dataService.getFoods().subscribe(foods => {
        if (foods) {
          //console.log(foods);
          this.foods = foods;
          this.displayElement = "hiddenDiv";
        } else {
          this.displayElement = "text-center display-4";
        }
      });
    } else {
      this.dataService.getFoodByCategory(this.foodCateId).subscribe(foods => {
        if (foods) {
          //console.log(this.foods);
          this.foods = foods;
          this.displayElement = "hiddenDiv";
        } else {
          this.displayElement = "text-center display-4";
        }
      });
    }
  }
  onClickCategory(catid) {
    this.foodCateId = catid;
    this.getFoods();
  }
  addItemToCard(food: Food) {
    //console.log(food);

    if (food) {
      console.log(food);
      let items: Item = {
        food: food,
        quantity: 1
      };
      console.log(items);

      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(items));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        console.log(cart.length);
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
      this.loadCart();
    }

  }

  loadCart() {
    this.total = 0;
    this.items = [];
    if (localStorage.getItem('cart') == null) {
      return;
    }
    if (localStorage.getItem('cart') != null) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          food: item.food,
          quantity: item.quantity
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

    if (items.length > 0 && this.customer['id'] != -1) {
      this.paymentReady = false;
    } else {
      this.paymentReady = true;
    }
    console.log(this.paymentReady);
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
  }

  callCustomerDialog() {
    const customerDialogRef = this.dialog.open(CustomersComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    customerDialogRef.afterClosed().subscribe(customer => {
      console.log(customer);
      if (customer != 'close') {
        this.customer = customer
        this.checkPayment();
      }
    });
  }
  callPaymentdialog() {
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
      console.log(msg);
      this.loadCart();
    });
  }
}
