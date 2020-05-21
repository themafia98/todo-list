import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../interface';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'sortableList',
  pure: true
})
export class SortableListPipe implements PipeTransform {
  private today: string = moment().format("DD.MM.YYYY");

  constructor(private authService: AuthService) { }

  get auth() {
    return this.authService;
  }

  get date() {
    return this.today;
  }

  transform(value: Array<TodoItem>, sortType: string = 'all'): Array<TodoItem> {
    if (sortType === 'all') return value;
    return value.filter(item => {
      if (this.auth?.filterId !== item?.uid) return null;

      const formatDate = moment(item.date, 'DD.MM.YYYY').format('DD.MM.YYYY');

      if (sortType === 'current' && this.date === formatDate) return item;
      else if (sortType === 'past' && this.date > formatDate) return item;
      else if (sortType === 'future' && this.date < formatDate) return item;

      return null;
    });
  }

}
