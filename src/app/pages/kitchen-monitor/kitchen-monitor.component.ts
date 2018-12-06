import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen-monitor',
  templateUrl: './kitchen-monitor.component.html',
  styleUrls: ['./kitchen-monitor.component.scss']
})
export class KitchenMonitorComponent implements OnInit {

  constructor(private dataService: DataService) { }
  orderTrackings: any;
  order_details: any;

  ngOnInit() {
    this.dataService.getOrdertrackingPending().then((result) => {
      this.orderTrackings = result;
      console.log(this.orderTrackings);
    });
  }


}
