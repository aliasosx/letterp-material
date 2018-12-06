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
  url = environment.url;
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
  getCurrCodes() {
    return this.http.get(this.url + 'currcodes', this.httpOptions);
  }
  addFood(food) {
    return this.http.post(this.url + 'food/addFood', JSON.stringify(food), this.httpOptions);
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
        resolve(result);
      });
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
      this.http.get(this.url + 'ordertrackingpending', this.httpOptions).subscribe(result => {
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

}
