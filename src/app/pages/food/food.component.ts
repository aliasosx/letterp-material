import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { Food } from 'src/app/models/food';
import { environment } from 'src/environments/environment';
import { MdcSnackbar, MdcDialog, MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { ConfirmationComponent } from 'src/app/dialogs/confirmation/confirmation.component';
import { AddfoodFormComponent } from 'src/app/dialogs/addfood-form/addfood-form.component';
import { FoodinfoComponent } from 'src/app/dialogs/foodinfo/foodinfo.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService, private dataService: DataService,
    private formBuilder: FormBuilder, private snackbar: MdcSnackbar, public dialog: MdcDialog) { }
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
  /* Snackbar */
  snackBarMsg: string = "test snack bar";
  action = "OK";
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;



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
  updateOnClick(food) {
    if (food) {
      this.dataService.getFoodById(food.id).subscribe(food => {
        const foodInfoDialogRef = this.dialog.open(FoodinfoComponent, {
          escapeToClose: true,
          clickOutsideToClose: true,
          scrollable: true,
          data: food
        });
      });
    }
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
  addFood(food) {

    if (food) {
      this.file = food.file;
      console.log(this.file);
      this.dataService.addFood(food).subscribe(data => {
        console.log(data);
        this.addFoodformGroup.reset();
        this.photoPath = "../../../assets/images/No_image_available.svg";
        //this.getFoods();

        if (data["status"].toLowerCase() == 'operation success') {
          this.showSnackbar('ເພິ່ມລາຍການອາຫານສຳເລັດ');
        }
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
        this.showSnackbar('ລາຍການຖືກລຶບໂດຍສົມບູນ!');
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

  showSnackbar(msg) {
    if (msg) {
      this.snackBarMsg = msg;
    }

    const snackbarRef = this.snackbar.show(this.snackBarMsg, this.action, {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });
    this.getFoods();
    snackbarRef.afterDismiss().subscribe(() => {
      //console.log('The snack-bar was dismissed')
    });
  }
  showDialog(id) {

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'accept') {
        this.deleteFood(id);
      } else {
        this.showSnackbar('ລາຍການຖືກຍົກເລີກ');
      }
    });
  }
  addFoodDialog() {
    const dialogRef = this.dialog.open(AddfoodFormComponent, {
      escapeToClose: true,
      clickOutsideToClose: false,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.addFood(data);
    });
  }

}