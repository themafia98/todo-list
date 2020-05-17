import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: moment.Moment, fmt: string = 'DD.MM.YYYY'): string {
    return value.locale(navigator.language).format(fmt);
  }

}
