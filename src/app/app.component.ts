import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) { }
  elem;
  ngOnInit() {
    console.log(this.router.url);
  }

}
