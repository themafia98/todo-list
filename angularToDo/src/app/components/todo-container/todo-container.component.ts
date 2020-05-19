import { Component, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../interface';
import { DataService } from 'src/app/services';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent {
  @Output() onChangeActivePopup: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService: DataService) { }


  get items() {
    return this.dataService.todo;
  }

  get sortType() {
    return this.dataService.sortType;
  }

  public onOpenPopup(item: TodoItem): void {
    const { id } = item;
    this.onChangeActivePopup.emit(id);
  }
}
