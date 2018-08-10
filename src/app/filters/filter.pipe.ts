import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, statusText: string): any[] {
    if(!items) return [];
    if(!searchText && !statusText) return items;
    return items.filter( item => {
      if(searchText && item.name.indexOf(searchText) === -1) {
        return false;
      }
      if(statusText && item.status.indexOf(statusText) === -1) {
        return false;
      }
      return true;
    });
   }
}
