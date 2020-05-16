import { Component, Input, SimpleChange } from '@angular/core';
import { TodoItem } from '../../interface';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent  {

  @Input('list') todoList: Array<TodoItem> = [];

  constructor() { }

   get items(){
     return this.todoList;
   }

  ngOnChanges(changes: SimpleChange): void {
    console.log(changes);
  }

}
