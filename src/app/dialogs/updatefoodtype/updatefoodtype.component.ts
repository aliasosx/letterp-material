import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';

@Component({
  selector: 'app-updatefoodtype',
  templateUrl: './updatefoodtype.component.html',
  styleUrls: ['./updatefoodtype.component.scss']
})
export class UpdatefoodtypeComponent implements OnInit {

  constructor(private dataService: DataService, private dialog: MdcDialog, private DialogRef: MdcDialogRef<UpdatefoodtypeComponent>,
    @Inject(MDC_DIALOG_DATA) public data: UpdatefoodtypeComponent) { }
  foodType: any;
  ngOnInit() {
    this.foodType = this.data;
    console.log(this.foodType);
  }
  updateFoodType(ftcode, ftdesc, ftdescla) {
    const foodtype = {
      'foodtype': {
        'id': this.foodType['id'],
        'food_type': ftcode,
        'food_type_desc': ftdesc,
        'food_type_desc_la': ftdescla
      }
    };
    this.dataService.updateFoodType(foodtype).subscribe(result => {
      if (!result) return;
      this.DialogRef.close(result);
    });
  }

}
