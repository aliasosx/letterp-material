import { Component, OnInit } from '@angular/core';
import { MdcTabActivatedEvent } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private dataService: DataService) { }
  foodTypeClass = "main-card";
  DiscountClass = "main-card";
  CurrencyClass = "main-card";
  foodtypes: any;
  ngOnInit() {
    this.getFoodTypes();
  }
  hideallCards(){
    this.CurrencyClass = "hiddenElement";
    this.DiscountClass = "hiddenElement";
    this.foodTypeClass = "hiddenElement";
  }
  
  logTab(e:MdcTabActivatedEvent){
    console.log(e);
    console.log(e.tab.label);
    switch (e.tab.label.toLowerCase()) {
      case "foods type": {
        this.hideallCards();
        this.foodTypeClass = "main-card";
        break;
      }
      case "discount": {
        this.hideallCards();
        this.DiscountClass = "main-card";
        break;
      }
      case "currency": {
        this.hideallCards();
        this.CurrencyClass = "main-card";
        break;
      }
    }
  }
  getFoodTypes(){
    this.dataService.getFoodTypes().subscribe(foodtypes => {
      this.foodtypes = foodtypes;
    });
  }
  
}
