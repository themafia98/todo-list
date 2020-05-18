import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[dateColor]'
})
export class TodoItemColorDirective {
  @Input() date: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    /** default */
    const className = this.getColorByDate();
    this.renderer.addClass(this.elementRef.nativeElement, className);
   }

  private getColorByDate(): string {
    const parsedDate: moment.Moment = moment(this.date, "DD.MM.YYYY");
    const today: moment.Moment = moment();

    if (this.isSame(parsedDate, today)) return 'current';
    else if (parsedDate.isBefore(today)) return 'past';
    else if (parsedDate.isAfter(today)) return 'future';

    return 'default';
  }

  public isSame(parsedDate: moment.Moment, today: moment.Moment): boolean {
    return parsedDate?.format("DD.MM.YYYY") === today?.format("DD.MM.YYYY");
  }

  public ngOnInit(): void {
    /** when date will come */
    const className = this.getColorByDate();
    this.renderer.addClass(this.elementRef.nativeElement, className);
  }
}
