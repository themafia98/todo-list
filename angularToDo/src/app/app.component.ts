import { Component } from '@angular/core';
import { TodoItem } from './interface';
import { DataService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private titleValue: string = 'Angular todo-list';

  constructor(private dataService: DataService){}

  get title(): string {
    return this.titleValue;
  }

  get list() {
    return this.dataService.list;
  }

  set list(item: Array<TodoItem>){
    this.dataService.list = item;
  }

  dataChangeHandler(item: TodoItem): void {
    this.dataService.addItem(item);
  }
}
