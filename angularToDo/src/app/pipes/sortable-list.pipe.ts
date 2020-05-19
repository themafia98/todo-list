import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../interface';
import * as moment from 'moment';

@Pipe({
  name: 'sortableList',
  pure: true
})
export class SortableListPipe implements PipeTransform {
  private today: string = moment().format("DD.MM.YYYY");

  get date(){
    return this.today;
  }

  transform(value: Array<TodoItem>, sortType: string = 'all'): Array<TodoItem> {
    if (sortType === 'all') return value;
    return value.filter(item => {
      const formatDate = moment(item.date, 'DD.MM.YYYY').format('DD.MM.YYYY');

      if (sortType === 'current' && this.date === formatDate) return item;
      else if (sortType === 'past' && this.date > formatDate) return item;
      else if (sortType === 'future' && this.date < formatDate) return item;

      return null;
    });
  }

}
