import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor() { }
  classes: string;
  ngOnInit() {
    this.classes = "display-4 text-center";
  }
  toggle() {
    if (this.classes == 'hiddenElement') {
      this.classes = "display-4 text-center";
    } else {
      this.classes = 'hiddenElement';
    }
  }
}
