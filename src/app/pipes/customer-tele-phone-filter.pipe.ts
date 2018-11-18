import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerTelePhoneFilter'
})
export class CustomerTelePhoneFilterPipe implements PipeTransform {
  transform(customers: any[], searchtext: string): any[] {
    if(!customers) return [];
    if(!searchtext) return customers;
    searchtext = searchtext.toLowerCase();
    return customers.filter( customer =>  {
        return customer['mobile'].toLowerCase().indexOf(searchtext) > -1;
    });
  }

}
