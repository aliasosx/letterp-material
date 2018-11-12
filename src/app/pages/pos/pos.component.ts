import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(private dataService: DataService) { }
  food_types: any;
  ngOnInit() {
    this.getFoodtype();
  }
  getFoodtype() {
    this.dataService.getFoodTypes().subscribe(food_type => {
      this.food_types = food_type;
      console.log(food_type);
    });
  }

}
