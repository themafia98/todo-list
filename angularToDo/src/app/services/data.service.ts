import { Injectable } from '@angular/core';
import { TodoItem } from '../interface';

@Injectable({
  providedIn: 'root'
})
export default class DataService {

  private todoList: Array<TodoItem> = [];

  get list(){
    return this.todoList;
  }

  set list(list: Array<TodoItem>){
    this.todoList = list;
  }

  addItem(item: TodoItem){
    this.todoList = [...this.todoList, item];
  }
}
