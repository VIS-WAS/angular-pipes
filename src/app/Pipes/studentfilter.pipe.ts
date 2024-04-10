import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Model/Students';

@Pipe({
  name: 'studentfilter',
  pure: false,
})
export class StudentFilterPipe implements PipeTransform {
  transform(list: Student[], filterBy: string) {
    console.log('Filter pipe called');
    if (
      filterBy.toLowerCase() === 'all' ||
      filterBy === '' ||
      list.length === 0
    ) {
      return list;
    } else {
      return list.filter((std) => {
        return std.gender.toLowerCase() === filterBy.toLowerCase();
      });
    }
  }
}
