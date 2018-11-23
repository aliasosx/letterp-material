import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printreceipt',
  templateUrl: './printreceipt.component.html',
  styleUrls: ['./styles.css']
})
export class PrintreceiptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  print() {
    const printContent = document.getElementById("invoice-POS");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
