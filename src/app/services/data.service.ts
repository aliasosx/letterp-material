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
  removeFood(food) {
    return this.http.post(this.url + 'food/remove', JSON.stringify(food), this.httpOptions);
  }
}
