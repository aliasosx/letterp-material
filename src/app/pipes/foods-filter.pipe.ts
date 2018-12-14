import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodsFilter'
})
export class FoodsFilterPipe implements PipeTransform {

  transform(foods: any[], field: string, name: any): any {
    if (!foods) { return }
    if (!name) { return foods }
    name = name.toLowerCase();
    return foods.filter(food => {
      return food[field].toLowerCase().indexOf(name) > -1;
    });
  }

}
