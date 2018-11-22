import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

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
  file: File;
  photoPath: any = '../../../assets/images/No_Image_Available.gif';
  env = environment.imageUrl;



  ngOnInit() {
    this.food = this.data[0];
    this.getFoodType();
    this.getKitchen();
    this.kt = this.food['kid'];
    this.ft = this.food['food_type_id'];
    console.log(this.kt);
    this.photoPath = this.food['photo'];
  }
  getFoodType() {
    this.dataService.getFoodTypes().subscribe(foodtypes => this.foodtypes = foodtypes);
  }
  getKitchen() {
    this.dataService.getKitchens().subscribe(kitchens => this.kitchens = kitchens);
  }
  updateFood(fn, ft, fc, fp, fk, img) {
    let photoFile = '';
    if (this.file) {
      photoFile = this.env + this.file.name;
    } else {
      photoFile = this.food['photo'];
    }
    const food = {
      'food': {
        'id': this.food['id'],
        'food_name': fn,
        'food_type_id': ft,
        'cost': fc,
        'price': fp,
        'kid': fk,
        'photo': photoFile,
        'currcode': this.food['currcode'],
      }
    }

    this.dataService.updateFood(food).subscribe(result => {
      if (result['changedRows'] == 1) {
        if (this.file) {
          const uploadData = new FormData();
          uploadData.append('image', this.file, this.file.name);
          this.dataService.uploadFoodPhoto(uploadData).subscribe(data => {
            console.log(data);
          });
        }
        this.dialogRef.close(result);
      }
    })
  }
  onFileChange(e) {
    this.file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.photoPath = (<FileReader>event.target).result;
    }
  }

}
