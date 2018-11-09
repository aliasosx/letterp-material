import { Component, OnInit, Inject } from '@angular/core';
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-foodinfo',
  templateUrl: './foodinfo.component.html',
  styleUrls: ['./foodinfo.component.scss']
})
export class FoodinfoComponent implements OnInit {
  constructor(public dialogRef: MdcDialogRef<FoodinfoComponent>, private dataService: DataService, @Inject(MDC_DIALOG_DATA) public data: FoodinfoComponent) { }
  ngOnInit() {
    console.log(this.data);
  }

}
