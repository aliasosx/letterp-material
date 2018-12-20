import { Food } from 'src/app/models/food';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';

@Component({
  selector: 'app-subtype-food-select',
  templateUrl: './subtype-food-select.component.html',
  styleUrls: ['./subtype-food-select.component.scss']
})
export class SubtypeFoodSelectComponent implements OnInit {

  food: any;
  subFoods: any;

  constructor(private dataService: DataService, private dialogRef: MdcDialogRef<SubtypeFoodSelectComponent>, @Inject(MDC_DIALOG_DATA) public data: SubtypeFoodSelectComponent) {
    this.food = data;
    this.loadSubfoodByFoodId(data);
  }
  subtype_select: FormGroup;
  ngOnInit() {
    console.log(this.food);

    this.subtype_select = new FormGroup({
      'subtype_id': new FormControl(),
      'food_id': new FormControl(),
      'subtype_name': new FormControl(),
      'cost': new FormControl(),
      'price': new FormControl()

    });
    console.log(this.food['id']);
  }
  loadSubfoodByFoodId(food) {
    this.dataService.getFoodSubTypeById(food['id']).then(res => {
      console.log(res);
      this.subtype_select = res;
    });
  }
  chooseFood(event) {
    // reformat json
    console.log(event);

    let food = {
      'cost': this.food['cost'],
      'curr_name_la': this.food['curr_name_la'],
      'enabled': this.food['enabled'],
      'food_name': this.food['food_name'],
      'food_type_desc_la': this.food['food_type_desc_la'],
      'id': this.food['id'],
      'kitchen_code': this.food['kitchen_code'],
      'kitchen_name': this.food['kitchen_name'],
      'photo': this.food['photo'],
      //'price':
    }
  }


}
