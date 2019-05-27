import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: any, propName: any) {
    if ( value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
  for (const i of value) {
    if (i[propName] === filterString ){
      resultArray.push(i);
    }
  }
    return resultArray;
  }

}
