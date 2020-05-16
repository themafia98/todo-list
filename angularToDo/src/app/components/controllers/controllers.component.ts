import { Component, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../interface';

@Component({
  selector: 'controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent {
  @Output() dataChanged: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  private newTodoName: string;

  constructor() {
    this.newTodoName = '';
  }

  get todoInput(){
    return this.newTodoName;
  }

  set todoInput(value: string){
    this.newTodoName = value;
  }


  public onAdd(event: MouseEvent): void {
    this.dataChanged.emit({
      id: Math.random(),
      name: this.todoInput
    });
    this.todoInput = '';
  }

  public onSort(sortType: string): void {
    console.log(sortType);
  }

}
