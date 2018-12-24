import { Food } from 'src/app/models/food';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { pipe, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
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
    this.subtype_select = new FormGroup({
      'subtype_id': new FormControl(),
      'food_id': new FormControl(),
      'subtype_name': new FormControl(),
      'cost': new FormControl(),
      'price': new FormControl()

    });
  }
  loadSubfoodByFoodId(food) {
    this.dataService.getFoodSubTypeById(food['id']).then(res => {
      console.log(res);
      this.subtype_select = res;
      this.subFoods = res;
    });
  }
  chooseFood(event) {
    let foodSubType = this.subFoods.filter(sfoods => sfoods.id == event)
    this.dialogRef.close(foodSubType);
  }
}
