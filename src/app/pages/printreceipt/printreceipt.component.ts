import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { MdcDialog, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { PrintReciptComponent } from 'src/app/dialogs/print-recipt/print-recipt.component';

@Component({
  selector: 'app-printreceipt',
  templateUrl: './printreceipt.component.html',
  styleUrls: ['./styles.css']
})
export class PrintreceiptComponent implements OnInit {

  constructor(private router: Router, private dialog: MdcDialog) { }

  ngOnInit() {
    console.log(this.router.url);
  }
  print() {
    const dialogRef = this.dialog.open(PrintReciptComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      scrollable: true
    });
  }

}
