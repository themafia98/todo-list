import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Day } from '../interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input('visibilityPicker') visibility: boolean = false;
  @Output() onChangeButtonTitle: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();
  private selectedDay: Day | null = null;
  private daysList: Array<Day> = [];
  private dayNames: Array<string> = [];
  private selectDate: moment.Moment = moment();
  private skipDays: number = moment().startOf('month').day();
  private totalDays: number = moment().daysInMonth() + 1;

  constructor() {
    moment.locale(navigator.language);
   }

   get date(){
     return this.selectDate;
   }

   get names(){
     return this.dayNames;
   }

   get days(){
     return this.daysList;
   }

   get selectDay(){
     return this.selectedDay;
   }

   set selectDay(day: Day | null){
     this.selectedDay = day;
   }

   getSelectDay(selectId: string): Day | null {
     return this.daysList.find(({ id }) => id === selectId) || null;
   }

   set days(list: Array<Day>){
     this.daysList = list;
   }

   onClickDay(id: string, disabled: boolean): void {
     if (id && !disabled) {
       this.selectDay = this.getSelectDay(id);
       const { day } = this.selectDay as Day;
       this.onChangeButtonTitle.emit(this.selectDate.date(day));
     }
   }

   generateWeekDayNames(): Array<string> {
     const daysNames: Array<string> = [];
     for (let i = 1; i <= 6; i++){
       daysNames.push(moment().day(i).format('ddd'));
     }

     daysNames.push(moment().day(0).format('ddd'));
     return daysNames;
   }

   generateDays(): Array<Day> {
    const a: number = 5 * 7;
    let j: number = 1;
    const counter = this.skipDays + this.totalDays;
    const countPrevMonthDays: number = moment().add(-1, 'month').daysInMonth() + 1;

    let startSkipDay: number = countPrevMonthDays - this.skipDays;
    const days: Array<Day> = [];

    for (let i = 1; i <= a; i++){
      if (i <= this.skipDays){
        days.push({ id: uuid(), disabled: true, day: startSkipDay++});
        continue;
      }

      if (i > counter  || i >= 31 + this.skipDays + 1){
        days.push({id: uuid(), disabled: true, day: j++ });
        continue;
      }

      days.push({id: uuid(), day: i - this.skipDays });
    }

    return days;
   }

   changeMonth(value: number): void {
     this.selectDate = moment(this.selectDate).add(value, 'month');
     const nextMonth: number = this.selectDate.startOf('month').day();

     this.skipDays = nextMonth > 0 ? nextMonth - 1 : nextMonth;
     this.totalDays = this.selectDate.daysInMonth() + 1;
     this.days = this.generateDays();
   }

  ngOnInit(): void {
    if (this.skipDays > 0) this.skipDays -= 1;
    this.dayNames = this.generateWeekDayNames();
    this.days = this.generateDays();
  }
}
