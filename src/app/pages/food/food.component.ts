import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { Food } from 'src/app/models/food';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService, private dataService: DataService,
    private formBuilder: FormBuilder) { }
  token: string;
  username: string;
  payload: string;
  tokenResponse: any;
  menus: any;
  menuclass: string;
  ativeMenu: string;
  title: string;
  public data: any;
  foot_type_list: any;
  currcodes: any;
  food: Food = new Food();
  public addFoodformGroup: FormGroup;
  file: File;
  photoPath: any = "../../../assets/images/No_image_available.svg";
  env = environment.imageUrl;
  envtoken = environment.token;

  ngOnInit() {
    this.title = 'Atlas';
    this.token = localStorage.getItem('token');
    /*Form instance initial */
    this.addFoodformGroup = new FormGroup({
      food_name: new FormControl(),
      cost: new FormControl(),
      price: new FormControl(),
      food_type_id: new FormControl(),
      currcode: new FormControl()
    });

    if (!this.token) {
      this.router.navigateByUrl('login');
    }
    this.auth.getTokenDecode({
      'token': this.token
    }).subscribe(data => {
      if (data) {
        this.tokenResponse = data;
        this.username = this.tokenResponse.payload.split('|')[0];
        this.initData();
      }
    });
  }
  initData() {
    this.getFoods();
    this.getFoodTypes();
    this.getCurrCode();
  }
  getFoods() {
    this.dataService.getFoods().subscribe(foods => {
      this.data = foods;
      //console.log(this.data);
    });
  }
  updateOnClick(id) {
    console.log(id);
  }
  getFoodTypes() {
    this.dataService.getFoodTypes().subscribe(foodtypes => {
      this.foot_type_list = foodtypes;
      //console.log(foodtypes);
    });
  }

  getCurrCode() {
    this.dataService.getCurrCodes().subscribe(currcodes => {
      this.currcodes = currcodes;
      //console.log(currcodes);
    });
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
          'photo': this.env + this.file.name
        }
      };
      this.dataService.addFood(food).subscribe(data => {
        const uploadData = new FormData();
        uploadData.append('image', this.file, this.file.name);
        this.dataService.uploadFoodPhoto(uploadData).subscribe(data => {
          console.log(data);
        });
        this.getFoods();
      });
    }
  }
  deleteFood(id) {
    if (id) {
      let food = {
        'food': {
          'id': id
        }
      };

      this.dataService.removeFood(food).subscribe(data => {
        console.log(data);
        this.getFoods();
      });
    }
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

}