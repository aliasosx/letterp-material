import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-foodinfo',
  templateUrl: './foodinfo.component.html',
  styleUrls: ['./foodinfo.component.scss']
})
export class FoodinfoComponent implements OnInit {
  constructor(public dialogRef: MdcDialogRef<FoodinfoComponent>, private dataService: DataService, @Inject(MDC_DIALOG_DATA) public data: FoodinfoComponent) { }
  food: any;
  foodtypes: any;
  kitchens: any;
  kt: any;
  ft: any;

  ngOnInit() {
    this.food = this.data[0];
    this.getFoodType();
    this.getKitchen();
    this.kt = this.food['kid'];
    this.ft = this.food['food_type_id'];
    console.log(this.kt);
  }
  getFoodType() {
    this.dataService.getFoodTypes().subscribe(foodtypes => this.foodtypes = foodtypes);
  }
  getKitchen() {
    this.dataService.getKitchens().subscribe(kitchens => this.kitchens = kitchens);
  }
  updateFood(fn, ft, fc, fp, fk, img) {
    const food = {
      'food': {
        'id': this.food['id'],
        'food_name': fn,
        'food_type_id': ft,
        'cost': fc,
        'price': fp,
        'kid': fk,
        'photo': this.food['photo'],
        'currcode': this.food['currcode'],
      }
    }
    console.log(food);
    this.dataService.updateFood(food).subscribe(result => {

      console.log(result);
      if (result['changedRows'] == 1) {
        this.dialogRef.close(result);
      }
    })

  }

}
