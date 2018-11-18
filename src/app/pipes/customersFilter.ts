import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'nameSearch'
})

export class CustomerFilter implements PipeTransform {
    transform(customers: any[], field: string ,searchText: string): any[] {
        if(!customers) return [];
        if(!searchText) return customers;

        searchText = searchText.toLowerCase();
        return customers.filter(customer => {
            return customer[field].toLowerCase().indexOf(searchText) > -1;
        });
    }
};