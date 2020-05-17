import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private daysList: Array<number> = [];
  private dayNames: Array<string> = [];
  private today: number = moment().date();
  private skipDays: number = moment().startOf('month').day() - 1;
  private totalDays: number = moment().daysInMonth() + 1;

  constructor() {
    moment.locale(navigator.language);
   }

   get names(){
     return this.dayNames;
   }

   get days(){
     debugger;
     return this.daysList;
   }

   set days(list: Array<number>){
     this.daysList = list;
   }

   generateWeekDayNames(): Array<string> {
     const daysNames: Array<string> = [];
     for (let i = 1; i <= 6; i++){
       daysNames.push(moment().day(i).format('ddd'));
     }

     daysNames.push(moment().day(0).format('ddd'));
     return daysNames;
   }

   generateDays(): Array<number> {

    const counter = this.skipDays + this.totalDays;
    const countPrevMonthDays: number = moment().add(-1, 'month').daysInMonth() + 1;

    let startSkipDay: number = countPrevMonthDays - this.skipDays;
    const days: Array<number> = [];

    for (let i = 1; i < counter; i++){
      if (i <= this.skipDays){
        days.push(startSkipDay++);
        continue;
      }

      days.push(i - this.skipDays);
    }

    return days;
   }

  ngOnInit(): void {
    this.dayNames = this.generateWeekDayNames();
    console.log('skipDays:', this.skipDays);
    console.log('today:', this.today);
    this.days = this.generateDays();
    console.log(moment().format('ddd'));
  }

}
