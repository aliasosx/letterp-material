import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token = localStorage.getItem("token");
  constructor(private http: HttpClient, private auth: AuthenticationService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token
    })
  };
  public url = environment.url;
  current_User: any;


  getMenu() {
    return this.http.get(this.url + 'menus/usermenu', this.httpOptions);
  }
  getMenuPermitt(link) {
    let usermenu = {
      'menu_link': link
    };
    return this.http.post(this.url + 'menus/usermenu', usermenu, this.httpOptions);
  }
  getCompany(company) {
    return this.http.post(this.url + 'company', company, this.httpOptions);
  }
  getFoods() {
    return this.http.get(this.url + 'foods', this.httpOptions);
  }
  getFoodById(id) {
    return this.http.get(this.url + 'food/' + id, this.httpOptions);
  }
  getFoodTypes() {
    return this.http.get(this.url + 'foodtypes', this.httpOptions);
  }
  getFoodTypeHasFood() {
    return this.http.get(this.url + 'foodtypehasfood', this.httpOptions);
  }
  getCurrCodes() {
    return this.http.get(this.url + 'currcodes', this.httpOptions);
  }
  addFood(food): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'food/addFood', JSON.stringify(food), this.httpOptions).subscribe(result => {
        resolve(result);
      });
    })

  }
  uploadFoodPhoto(file) {
    return this.http.post(this.url + 'food/upload', file);
  }


  removeFood(food) {
    return this.http.post(this.url + 'food/remove', JSON.stringify(food), this.httpOptions);
  }
  createFoodType(f) {
    let foodtype = {
      'foodtype': {
        'food_type': f.FoodType.toUpperCase(),
        'food_type_desc': f.FoodTypeDescription,
        'food_type_desc_la': f.FoodTypeDescription_la
      }
    }
    return this.http.post(this.url + 'foodtype', foodtype, this.httpOptions);
  }
  deleteFoodType(id) {
    return this.http.delete(this.url + 'foodtype/' + id, this.httpOptions);
  }
  updateFoodType(foodtype) {
    return this.http.put(this.url + 'foodtype', foodtype, this.httpOptions);
  }

  getDiscounts() {
    return this.http.get(this.url + 'discounts', this.httpOptions);
  }
  deleteDiscount(id) {
    return this.http.delete(this.url + 'discount/' + id, this.httpOptions);
  }
  createDiscount(d) {
    let discount = {
      'discount': {
        'food_id': d.food_id,
        'discount_percentage': d.discount_percentage,
        'valid_until': d.valid_until,
        'status': 'VALID'
      }
    }
    console.log(discount);
    return this.http.post(this.url + 'discount', discount, this.httpOptions);
  }
  updateFood(food) {
    return this.http.put(this.url + 'food', food, this.httpOptions);
  }
  getFoodByNoDiscount() {
    return this.http.get(this.url + 'foodnodiscounts', this.httpOptions);
  }
  getFoodByCategory(catid) {
    return this.http.get(this.url + 'foodbycat/' + catid, this.httpOptions);
  }
  getCustomers() {
    return this.http.get(this.url + 'customers', this.httpOptions);
  }
  getQTags() {
    return this.http.get(this.url + 'q', this.httpOptions);
  }
  getKitchens() {
    return this.http.get(this.url + 'kitchens', this.httpOptions);
  }

  createOrder(order) {
    return this.http.post(this.url + 'order', JSON.stringify(order), this.httpOptions);
  }
  activateFood(food) {
    return this.http.put(this.url + 'foodactive', food, this.httpOptions);
  }

  getOrderTrackings() {
    return this.http.get(this.url + 'ordertracking', this.httpOptions);
  }

  getUsers() {
    return this.http.get(this.url + 'users', this.httpOptions);
  }
  addUser(user) {
    return this.http.post(this.url + 'users/add', user, this.httpOptions);
  }
  deleteUser(id) {
    return this.http.delete(this.url + 'users/delete/' + id, this.httpOptions)
  }
  getRoles() {
    return this.http.get(this.url + 'roles', this.httpOptions);
  }
  uploadUserPhoto(file) {
    return this.http.post(this.url + '/users/upload', file);
  }
  getUserInfo(user) {
    return this.http.post(this.url + 'users/usersbyusername', user, this.httpOptions);
  }


  getUserInforByUsername(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'users/usersbyusername', user, this.httpOptions).subscribe(result => {
        //console.log(result);
        resolve(result);
      });
    });
  }
  getCurrentUserSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.token) {
        this.auth.getTokenDecode({ 'token': this.token }).subscribe(result => {
          let userToken = result['payload'].split('|');
          if (userToken[0]) {
            this.http.post(this.url + 'users/usersbyusername', { 'user': { 'user_name': userToken[0] } }, this.httpOptions).subscribe(result => {
              resolve(result);
            });
          }
        });
      } else {
        resolve();
      }
    });
  }
  updateOrderTrack(orderTrack): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'ordertracking', orderTrack, this.httpOptions).subscribe(result => {
        resolve(result);
      });
    });
  }

  getOrdertrackingPending(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'ordertrackingpending').subscribe(result => {
        resolve(result);
      });
    });
  }
  getOrderDetailByOrderId(order_id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'orderbyid/' + order_id, this.httpOptions).subscribe(result => {
        resolve(result);
      });
    });
  }
  auditUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'users/audit', user).subscribe(result => {
        resolve(result);
      });
    });
  }
  changePasswordByEmpId(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'users/changePasswordUserByEmpId', user, this.httpOptions).subscribe(result => resolve(result));
    });
  }
  getFoodTypeByName(foodtype): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'foodtypebyname', foodtype, this.httpOptions).subscribe(result => {
        resolve(result);
      });
    });
  }
  //Get report

  getReportByCat(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'reports/reportByCats', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getReportRevByKitchen(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'reports/reportRevBykitchen', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  //Get Subtype
  getFoodSubType(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'foodsubtypes', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  addNewFoodSubType(foodSubtype): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'foodsubtype', foodSubtype, this.httpOptions).subscribe(res => {
        console.log(res);
        if (res['status'] == 'success') {
          resolve(true);
        } else {
          resolve(false);
        }

      });
    });
  }


}
