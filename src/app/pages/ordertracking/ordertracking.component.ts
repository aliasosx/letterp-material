import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.scss']
})
export class OrdertrackingComponent implements OnInit {
  ordertracking: any;
  nowdate: Date;
  interval: any;

  constructor(public dataService: DataService) {
    /*
    setInterval(() => {
      this.nowdate = new Date();
    }, 10000);
    */
  }

  ngOnInit() {
    this.loadOrderTrackings();

  }
  loadOrderTrackings(): any {
    this.dataService.getOrderTrackings().subscribe(data => this.ordertracking = data);
  }
  updateFinishOrder(order) {
    let pipe = new DatePipe('en-US');
    const now = new Date();
    const orderTracking = {
      'ordertrack': {
        'order_id': order.order_id,
        'done': 1,
        'order_status': 'DELIVERED',
        'position': 'FRONT COUNTER',
        'finishtime': pipe.transform(now, 'yyyy-MM-dd HH:mm:ss'),
      }
    };

    this.dataService.updateOrderTrackDone(orderTracking).subscribe(result => {
      console.log(result);
      this.loadOrderTrackings();
    });

  }

}
