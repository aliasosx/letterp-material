import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Food } from '../../models/food';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(private dataService: DataService) { }
  food_types: any;
  foods: any;
  foodCateId: string;

  total: number = 0;
  items: Item[] = [];
  displayElement = "text-center display-4";
  ngOnInit() {
    this.foodCateId = "all";
    this.getFoodtype();
    this.getFoods();
    
    this.loadCart();
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
  addItemToCard(food:Food) {
    //console.log(food);
    
    if(food){
      console.log(food);
      let items : Item = {
        food: food,
        quantity : 1
      };
      console.log(items);

      if(localStorage.getItem('cart') == null){
        let cart : any = [];
        cart.push(JSON.stringify(items));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart : any = JSON.parse(localStorage.getItem('cart'));
        console.log(cart.length);
        let index : number = -1;
        for (var i = 0; i < cart.length ; i++){
          let item: Item = JSON.parse(cart[i]);
          if(item.food.id == food.id){
            index = i;
            break;
          }
        }
        if (index == -1 ){
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

  loadCart(){
    this.total = 0;
    this.items = [];
    if (localStorage.getItem('cart') != null){
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++ ){
        let item = JSON.parse(cart[i]);
        this.items.push({
          food: item.food,
          quantity: item.quantity
        });
        this.total += item.food.price * item.quantity;
        console.log(this.items);
        console.log(this.total);
      }
    }
  }
}
