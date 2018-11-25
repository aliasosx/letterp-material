import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserResponse } from '../models/user-response';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  token = localStorage.getItem('token');
  url = environment.url;
  getlogin(login) {
    return this.http.post<IUserResponse>(this.url + 'login', login, this.httpOptions);
  }
  getTokenDecode(token) {
    return this.http.post(this.url + 'login/decode', token, this.httpOptions);
  }

  isAuthenticated(): Observable<boolean> {

    return new Observable<boolean>(observable => {
      this.getTokenDecode({ 'token': this.token }).subscribe(auth => {
        if (auth == null) {
          observable.next(false);
        } else if (auth['payload'] == null) {
          observable.next(false);
        } else {
          observable.next(true);
        }
      });
    }
    );
  }

}
