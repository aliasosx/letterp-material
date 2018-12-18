import { DataService } from './../../services/data.service';
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foodsubtype',
  templateUrl: './foodsubtype.component.html',
  styleUrls: ['./foodsubtype.component.scss']
})
export class FoodsubtypeComponent implements OnInit {
  subtypeFoodForm: FormGroup;

  constructor(private dialog: MdcDialog, private dataService: DataService, private dialogRef: MdcDialogRef<FoodsubtypeComponent>) { }

  ngOnInit() {
    this.subtypeFoodForm = new FormGroup({
      'subtype_name': new FormControl(),
    });
  }
  addFoodSubtype() {
    if (this.subtypeFoodForm.get('subtype_name').value) {
      this.dataService.addNewFoodSubType({
        'foodSubtype': {
          'subtype_name': this.subtypeFoodForm.get('subtype_name').value
        }
      }).then(res => {
        console.log(res);
        if (res) {
          this.dialogRef.close('success');
        } else {
          return;
        }
      })
    }
  }
}
