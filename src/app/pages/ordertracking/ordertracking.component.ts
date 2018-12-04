import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.scss']
})
export class OrdertrackingComponent implements OnInit {
  ordertracking: any;
  nowdate: Date;
  interval: any;

  constructor(public dataService: DataService, private auth: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    //console.log(this.dataService.CurrentUser);
    this.auth.isAuthenticated().subscribe(result => {
      if (result === true) {
        this.dataService.getMenuPermitt(this.router.url.replace("/", "")).subscribe(result => {
          console.log(result);
        });

        this.loadOrderTrackings();
      } else {
        this.router.navigateByUrl('login');
      }
    });

  }

  loadOrderTrackings(): any {
    this.dataService.getOrderTrackings().subscribe(data => this.ordertracking = data);
  }
  updateFinishOrder(order) {
    let pipe = new DatePipe('en-US');
    const now = new Date();

    let token = localStorage.getItem('token');

    this.auth.getTokenDecode({ 'token': token }).subscribe(result => {
      let user = {
        'user': {
          'user_name': result['payload'].split("|")[0]
        }
      };
      this.dataService.getUserInfo(user).subscribe(userResult => {
        let userInfo = userResult;
        const orderTracking = {
          'ordertrack': {
            'order_id': order.order_id,
            'done': 1,
            'order_status': 'DELIVERED',
            'position': 'FRONT COUNTER',
            'finishtime': pipe.transform(now, 'yyyy-MM-dd HH:mm:ss'),
            'qtag': order.qtag,
            'emp_id': userInfo[0].emp_id
          }
        };
        if (userInfo[0].emp_id) {
          this.dataService.updateOrderTrackDone(orderTracking).subscribe(result => {
            console.log(result);
            this.loadOrderTrackings();
            alert('Order Completed');
          });
        }
      });
    });
  }
  cancelOrder(order) {
    let pipe = new DatePipe('en-US');
    const now = new Date();
    let token = localStorage.getItem('token');

    this.auth.getTokenDecode({ 'token': token }).subscribe(result => {
      let user = {
        'user': {
          'user_name': result['payload'].split("|")[0]
        }
      };
      this.dataService.getUserInfo(user).subscribe(userResult => {
        let userInfo = userResult;
        const OrderTracking = {
          'ordertrack': {
            'order_id': order.order_id,
            'done': 2,
            'order_status': 'CANCELLED',
            'position': 'FRONT COUNTER',
            'finishtime': pipe.transform(now, 'yyyy-MM-dd HH:mm:ss'),
            'qtag': order.qtag,
            'emp_id': userInfo[0].emp_id
          }
        };
        console.log(OrderTracking);
        if (userInfo[0].emp_id) {
          this.dataService.updateOrderTrackDone(OrderTracking).subscribe(result => {
            console.log(result);
            this.loadOrderTrackings();
            alert('Order Cancelled');
          });
        }
      });









    });



  }

}
