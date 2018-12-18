
import { from, interval } from 'rxjs';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-kitchen-monitor',
  templateUrl: './kitchen-monitor.component.html',
  styleUrls: ['./kitchen-monitor.component.scss']
})
export class KitchenMonitorComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) {
    setInterval(() => {
      this.getLatestOrder();
    }, 1000);
  }
  orderTrackings: any;
  order_details: any;
  orders: Array<any> = [];
  order_tracks: any;
  nowdate: Date;
  first_load_count = -1;
  ngOnInit() {
    this.dataService.getOrdertrackingPending().then((result) => {
      this.orderTrackings = result;
      if (this.first_load_count == -1) {
        this.first_load_count = result.length;
        this.dataPresentation(result);
      }
    });

    // console.log(this.order_tracks);
    //const time1: any = new Date('2018-12-08 01:00:00').getTime();
  }

  dataPresentation(data: any) {
    this.orders = [];
    const source = from(data);
    const grouped = source.pipe(
      groupBy(result => result['qtag']),
      mergeMap(group => group.pipe(toArray()))
    );

    grouped.subscribe(data => {
      this.orders.push(data);
    }
    );
    this.order_tracks = {
      'order': this.orders
    };

  }

  getLatestOrder() {
    if (this.first_load_count != -1) {
      this.dataService.getOrdertrackingPending().then(result => {
        if (this.first_load_count < result.length) {
          this.first_load_count = result.length;
          this.dataPresentation(result);
        }
      });
    }
  }

  getOrderById(order_id): any {
    this.dataService.getOrderDetailByOrderId(order_id).then(orderDetails => {
      return orderDetails;
    });
  }
  getTimeOrderRemaing(orderTime) {
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
