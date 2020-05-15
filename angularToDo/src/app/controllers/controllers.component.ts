import { Component } from '@angular/core';

@Component({
  selector: 'controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent {
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

  public onAdd(event: MouseEvent): void{
    this.todoInput = '';
  }

}
