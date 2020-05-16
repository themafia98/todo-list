import { Component } from '@angular/core';
import { TodoItem } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private titleValue: string = 'Angular todo-list';
  private todoList: Array<TodoItem> = [];

  get todos(){
    return this.todoList;
  }

  set todos(todo: Array<TodoItem>){
    this.todoList = todo;
  }

  get title(): string {
    return this.titleValue;
  }

  dataChangeHandler(item: TodoItem){
    this.todos = [...this.todos, item];
  }

}
