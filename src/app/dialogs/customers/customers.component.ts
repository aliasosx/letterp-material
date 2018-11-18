import { Component, OnInit } from '@angular/core';
import { MdcDialogRef, MdcDialog } from '@angular-mdc/web';
import { DataService } from 'src/app/services/data.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<CustomersComponent>, private dialog: MdcDialog, private dataService: DataService) { }
  customers: any;
  searchField: string = 'fullname';
  ngOnInit() {
    this.loadCustomers();
  }
  loadCustomers(){
    console.log('Customer loading ...');
    this.dataService.getCustomers().subscribe(customers => this.customers = customers);
  }
  selectCustomer(customer){
    this.dialogRef.close(customer);
  }
  setSearchType(event){
    this.searchField = event.value.toLowerCase();
  }

}
