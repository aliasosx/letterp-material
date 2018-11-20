import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { Food } from 'src/app/models/food';
@Component({
  selector: 'app-addfood-form',
  templateUrl: './addfood-form.component.html',
  styleUrls: ['./addfood-form.component.scss']
})
export class AddfoodFormComponent implements OnInit {
  photoPath: any = "../../../assets/images/No_Image_Available.gif";
  file: File;
  foot_type_list: any;
  currcodes: any;
  env = environment.imageUrl;
  addFoodformGroup: FormGroup;
  food: any;
  kitchens: any;
  constructor(public dialogRef: MdcDialogRef<AddfoodFormComponent>, private dataService: DataService, @Inject(MDC_DIALOG_DATA) public data: AddfoodFormComponent) { }
  selectedFoodType = 'FOOD';
  ngOnInit() {
    this.addFoodformGroup = new FormGroup({
      food_name: new FormControl(),
      cost: new FormControl(),
      price: new FormControl(),
      food_type_id: new FormControl(),
      currcode: new FormControl(),
      kitchen_code: new FormControl,

    });
    this.getFoodTypes();
    this.getCurrCode();
    this.getKitchens();
  }
  onFileChange(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.photoPath = (<FileReader>event.target).result;
    }
    console.log(this.file);
  }
  getFoodTypes() {
    this.dataService.getFoodTypes().subscribe(foodtypes => {
      this.foot_type_list = foodtypes;
    });
  }
  getCurrCode() {
    this.dataService.getCurrCodes().subscribe(currcodes => {
      this.currcodes = currcodes;
    });
  }

  getKitchens() {
    this.dataService.getKitchens().subscribe(kitchens => this.kitchens = kitchens);
  }

  addFood() {
    if (this.addFoodformGroup) {
      let food = {
        'food': {
          'food_name': this.addFoodformGroup.get('food_name').value,
          'food_type_id': this.addFoodformGroup.get('food_type_id').value,
          'cost': this.addFoodformGroup.get('cost').value,
          'price': this.addFoodformGroup.get('price').value,
          'currcode': this.addFoodformGroup.get('currcode').value,
          'created_by': 'ADMIN',
          'photo': this.env + this.file.name,
          'kid': this.addFoodformGroup.get('kitchen_code').value,
        }
      };
      if (this.file) {
        const uploadData = new FormData();
        uploadData.append('image', this.file, this.file.name);
        this.dataService.uploadFoodPhoto(uploadData).subscribe(data => {
          console.log(data);
        });
        this.dialogRef.close(food);
      } else {
        alert('Please select file to upload ');
      }
    }
  }
}
