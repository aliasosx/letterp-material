import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemainig'
})
export class TimeRemainigPipe implements PipeTransform {

  transform(ordertime: any, args?: any): any {

    return null;
  }

}
