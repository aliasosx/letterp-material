import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token = localStorage.getItem("token");
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token
    })
  };
  url = environment.url;
  getMenu() {
    return this.http.get(this.url + 'menus/usermenu', this.httpOptions);
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
  getFoodByNoDiscount() {
    return this.http.get(this.url + 'foodnodiscounts', this.httpOptions);
  }
  getFoodByCategory(catid) {
    return this.http.get(this.url + 'foodbycat/' + catid, this.httpOptions);
  }
  getCustomers(){
    return this.http.get(this.url + 'customers', this.httpOptions);
  }
}
