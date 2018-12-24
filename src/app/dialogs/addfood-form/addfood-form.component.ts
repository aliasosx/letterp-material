import { filter, map } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Component({
  selector: 'app-addfood-form',
  templateUrl: './addfood-form.component.html',
  styleUrls: ['./addfood-form.component.scss']
})
export class AddfoodFormComponent implements OnInit {
  photoPath: any = '../../../assets/images/No_Image_Available.gif';
  file: File;
  foot_type_list: any;
  currcodes: any;
  env = environment.imageUrl;
  addFoodformGroup: FormGroup;
  food: any;
  kitchens: any;
  constructor(public dialogRef: MdcDialogRef<AddfoodFormComponent>, private dataService: DataService, @Inject(MDC_DIALOG_DATA) public data: AddfoodFormComponent) { }
  selectedFoodType = 'FOOD';
  currentUserSession_code: any;
  food_subtype_list: any;

  masterFoodSelect: any;

  ngOnInit() {
    this.addFoodformGroup = new FormGroup({
      food_name: new FormControl(),
      cost: new FormControl(),
      price: new FormControl(),
      food_type_id: new FormControl(),
      currcode: new FormControl(),
      kitchen_code: new FormControl(),
      master_food_id: new FormControl(),
      enabled_subtype: new FormControl(),

    });
    this.dataService.getCurrentUserSession().then(userInfo => {
      this.currentUserSession_code = userInfo[0].emp_id;
      this.getFoodTypes();
      this.getCurrCode();
      this.getKitchens();
      this.getFoodSubTypes();
      this.loadMasterFood();
    });

  }

  loadMasterFood() {
    this.dataService.getFoods().subscribe(res => {
      this.masterFoodSelect = res;
    });
    //console.log(this.masterFoodSelect);
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
  getFoodSubTypes() {
    this.dataService.getFoodSubType().then(res => {
      this.food_subtype_list = res;
    });
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
      const food = {
        'food': {
          'food_name': this.addFoodformGroup.get('food_name').value,
          'food_type_id': this.addFoodformGroup.get('food_type_id').value,
          'cost': this.addFoodformGroup.get('cost').value,
          'price': this.addFoodformGroup.get('price').value,
          'currcode': this.addFoodformGroup.get('currcode').value,
          'created_by': this.currentUserSession_code,
          'photo': this.file.name,
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
