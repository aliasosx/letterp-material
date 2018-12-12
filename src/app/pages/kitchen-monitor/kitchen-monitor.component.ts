
import { from, interval } from 'rxjs';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen-monitor',
  templateUrl: './kitchen-monitor.component.html',
  styleUrls: ['./kitchen-monitor.component.scss']
})
export class KitchenMonitorComponent implements OnInit {

  constructor(private dataService: DataService) {
    setInterval(() => {
      this.nowdate = new Date();
    });
  }
  orderTrackings: any;
  order_details: any;
  orders: Array<any> = [];
  order_tracks: any;
  nowdate: Date;
  ngOnInit() {
    this.dataService.getOrdertrackingPending().then((result) => {
      this.orderTrackings = result;
      
      var source = from(result);
      var grouped = source.pipe(
        groupBy(result => result['qtag']),
        mergeMap(group => group.pipe(toArray()))
      );

      grouped.subscribe(data => {
        this.orders.push(data);
      });
    });
    this.order_tracks = {
      'order': this.orders
    }
    //console.log(this.order_tracks);
    let time1: any = new Date("2018-12-08 01:00:00").getTime();


    this.dataService.getUserInforByUsername({ 'user': 'admin' }).then(data => {
      console.log(data);
    })
  }
  getOrderById(order_id): any {
    this.dataService.getOrderDetailByOrderId(order_id).then(orderDetails => {
      return orderDetails;
    });
  }
  getTimeOrderRemaing(orderTime) {
    interval(1000).pipe(
      map((x) => {
        console.log(x - orderTime.getTime());
        return x;
      })
    );
  }
}
