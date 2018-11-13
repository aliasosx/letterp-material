import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Cart } from 'src/app/models/cart';

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
  card: Cart[];
  displayElement = "text-center display-4";
  ngOnInit() {
    this.foodCateId = "all";
    this.getFoodtype();
    this.getFoods();
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
          console.log(this.foods);
          this.foods = foods;
          this.displayElement = "hiddenDiv";
        } else {
          this.displayElement = "text-center display-4";
        }
      });
    } else {
      this.dataService.getFoodByCategory(this.foodCateId).subscribe(foods => {
        if (foods) {
          console.log(this.foods);
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
  addItemToCard(food) {
    
  }
}
