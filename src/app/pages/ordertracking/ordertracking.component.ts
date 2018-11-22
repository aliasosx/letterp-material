import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.scss']
})
export class OrdertrackingComponent implements OnInit {
  ordertracking: any;
  nowdate: Date;
  constructor(public dataService: DataService) {
    setInterval(() => {
      this.nowdate = new Date();
    });
  }

  ngOnInit() {
    this.loadOrderTrackings();
  }
  loadOrderTrackings(): any {
    this.dataService.getOrderTrackings().subscribe(data => this.ordertracking = data);
  }

}
