import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[dateColor]'
})
export class TodoItemColorDirective {
  @Input() date: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    /** default */
    this.renderer.setStyle(this.elementRef.nativeElement, "background-color", this.getColorByDate());
   }

  private getColorByDate(): string {
    const parsedDate: moment.Moment = moment(this.date, "DD.MM.YYYY");
    const today: moment.Moment = moment();

    if (this.isSame(parsedDate, today)) return '#c9d33e';
    else if (parsedDate.isBefore(today)) return '#808080';
    else if (parsedDate.isAfter(today)) return '#add8e6';

    return '';
  }

  public isSame(parsedDate: moment.Moment, today: moment.Moment): boolean {
    return parsedDate?.format("DD.MM.YYYY") === today?.format("DD.MM.YYYY");
  }

  public ngOnInit(): void {
    /** when date will come */
    this.renderer.setStyle(this.elementRef.nativeElement, "background-color", this.getColorByDate());
  }

}
