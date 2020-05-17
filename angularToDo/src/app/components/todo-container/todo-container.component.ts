import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../interface';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent  {
  @Input('list') todoList: Array<TodoItem> = [];
  @Output() onChangeActivePopup: EventEmitter<string> = new EventEmitter<string>();

   get items(){
     return this.todoList;
   }

   onOpenPopup(item: TodoItem): void {
     const { id } = item;
     this.onChangeActivePopup.emit(id);
   }
}
