import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-recipt',
  templateUrl: './print-recipt.component.html',
  styleUrls: ['./print-recipt.component.scss']
})
export class PrintReciptComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  print() {
    window.print();
  }


}
