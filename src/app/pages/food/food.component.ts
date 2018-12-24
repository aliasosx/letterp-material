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
declare var $;

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
  photoPath: any = '../../../assets/images/No_image_available.svg';
  env = environment.imageUrl;
  envtoken = environment.token;
  /* Snackbar */
  snackBarMsg: string = 'test snack bar';
  action = 'OK';
  multiline = false;
  dismissOnAction: boolean = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;
  currentUserSession_code: any;
  searchField: string = "food_name"
  searchtxt: any;
  url = environment.imageUrl;

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
    this.dataService.getCurrentUserSession().then(userInfo => {
      this.currentUserSession_code = userInfo[0].emp_id;
    });
  }
  initData() {
    this.getFoods();
    this.getFoodTypes();
    this.getCurrCode();
  }
  getFoods() {
    this.dataService.getFoodsList().subscribe(foods => {
      this.data = foods;
      console.log(this.data);
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
        foodInfoDialogRef.afterClosed().subscribe(result => {
          if (result === 'close') return;
          this.showSnackbar('Updated');
          this.getFoods();
        });
      });
    }
  }
  getFoodTypes() {
    this.dataService.getFoodTypes().subscribe(foodtypes => {
      this.foot_type_list = foodtypes;
      // console.log(foodtypes);
    });
  }

  getCurrCode() {
    this.dataService.getCurrCodes().subscribe(currcodes => {
      this.currcodes = currcodes;
      // console.log(currcodes);
    });
  }
  addFood(food) {

    if (food) {
      this.file = food.file;
      console.log(this.file);
      /*
      this.dataService.addFood(food).subscribe(data => {
        console.log(data);
        this.addFoodformGroup.reset();
        this.photoPath = '../../../assets/images/No_image_available.svg';
        // this.getFoods();

        if (data['status'].toLowerCase() === 'operation success') {
          this.showSnackbar('ເພິ່ມລາຍການອາຫານສຳເລັດ');
        }
      });
      */
      this.dataService.addFood(food).then(result => {
        this.addFoodformGroup.reset();
        this.photoPath = '../../../assets/images/No_image_available.svg';
        if (result['status'].toLowerCase() === 'operation success') {
          this.showSnackbar('ເພິ່ມລາຍການອາຫານສຳເລັດ');
        }
        console.log(food);
        this.dataService.auditUser({
          'user': {
            'emp_id': this.currentUserSession_code,
            'activity': 'Add new food : ' + food.food.food_name,
          }
        }).then(console.log);
      });

    }
  }
  deleteFood(id) {
    if (id) {
      const food = {
        'food': {
          'id': id
        }
      };

      this.dataService.removeFood(food).subscribe(data => {
        console.log(data);
        this.dataService.auditUser({
          'user': {
            'emp_id': this.currentUserSession_code,
            'activity': 'delete food id : ' + id,
          }
        }).then(console.log);
        this.showSnackbar('ລາຍການຖືກລຶບໂດຍສົມບູນ!');
        this.getFoods();
      });
    }
  }

  onFileChange(e) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e) => {
      this.photoPath = (<FileReader>event.target).result;
    };
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
      console.log('The snack-bar was dismissed');
    });
  }
  showDialog(id) {

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.deleteFood(id);
      } else {
        this.showSnackbar('ລາຍການຖືກຍົກເລີກ');
      }
    });
  }
  addFoodDialog() {
    const dialogRef = this.dialog.open(AddfoodFormComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(data => {
      this.addFood(data);
    });
  }
  activateFood(e, id) {
    console.log(e.checked);
    let sign = 1;
    if (e.checked === false) {
      sign = 0;
    }
    const food = {
      'food': {
        'id': id,
        'enabled': sign
      }
    }
    /*
    this.dataService.activateFood(food).subscribe(result => {
      this.showSnackbar(result);
    });
    */

  }

}
