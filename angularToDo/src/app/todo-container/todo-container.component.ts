import { Component, OnInit } from '@angular/core';

interface TodoItem {
  id: number;
  name: string;
}

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  private itemsList: Array<TodoItem> = [{ id: 1, name: 'Hi' }, { id:2, name: 'Angular' }];

  constructor() { }

  get items(){
    return this.itemsList;
  }

  ngOnInit(): void {
  }

}
