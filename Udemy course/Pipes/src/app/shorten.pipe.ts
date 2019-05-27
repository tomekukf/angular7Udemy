import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  // transform(value: any) {
  //   return value.substr(0, 10);
  // }

  transform(value: string, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;

  }

}
