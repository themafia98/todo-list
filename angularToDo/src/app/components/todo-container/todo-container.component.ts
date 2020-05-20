import { Component, EventEmitter, Output } from '@angular/core';
import DataService from '../../services/data.service';
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

  public onOpenPopup({ id = '' }): void {
    if (id) this.onChangeActivePopup.emit(id);
  }
}
