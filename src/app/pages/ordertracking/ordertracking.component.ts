import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.scss']
})
export class OrdertrackingComponent implements OnInit {
  ordertracking: any;
  nowdate: Date;
  interval: any;

  constructor(public dataService: DataService, private auth: AuthenticationService, private router: Router) { }
  //current_user: string;
  ngOnInit() {

    this.dataService.getUserInforByUsername({
      'user': {
        'user_name': 'admin'
      }
    }).then((val) => {
      //console.log(val);
    });

    this.auth.isAuthenticated().subscribe(result => {
      if (result === true) {
        this.dataService.getMenuPermitt(this.router.url.replace("/", "")).subscribe(result => {
          //console.log(result);
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

    this.dataService.getCurrentUserSession().then(result => {
      let userInfo = result;
      const OrderTracking = {
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

      this.dataService.updateOrderTrack(OrderTracking).then((result) => {
        this.loadOrderTrackings();
        this.auditUserAdd(userInfo[0].emp_id, 'Update Order completed and send to customer order id : ' + order.order_id);
        alert('Order Ended');
      });
    });


  }

  auditUserAdd(emp_id, activity) {
    this.dataService.auditUser({
      'user': {
        'emp_id': emp_id,
        'activity': activity
      }
    }).then(console.log);
  }

  cancelOrder(order) {
    let pipe = new DatePipe('en-US');
    const now = new Date();
    let token = localStorage.getItem('token');

    this.auth.tokenDecode({ 'token': token }).then((result) => {
      let user = {
        'user': {
          'user_name': result['payload'].split("|")[0]
        }
      }
      this.dataService.getUserInforByUsername(user).then(result => {
        let userInfo = result;
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

        this.dataService.updateOrderTrack(OrderTracking).then((result) => {
          this.loadOrderTrackings();
          this.auditUserAdd(userInfo[0].emp_id, 'Update Order Cancelled order id : ' + order.order_id);
          alert('Order Cancelled');
        });
      });
    });
  }
  getTimeOrderRemaing(orderTime) {
    if (!orderTime) {
      return;
    }
    let startTime = new Date(orderTime);
    var timestamp = startTime.getTime();
    //console.log(timestamp);

    let newDate = new Date();
    let newTimestamp = newDate.getTime();

    let timer;

    let diff = Math.round((newTimestamp - timestamp) / 1000);
    var d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    var h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    var m = Math.floor(diff / (60));
    diff = diff - (m * 60);

    var s = diff;

    return h + ':' + m + ':' + s;
  }
}
