import { Component, Output, EventEmitter, SimpleChange } from '@angular/core';
import { TodoItem } from '../../interface';
import { DataService } from 'src/app/services';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent  {
  @Output() onChangeActivePopup: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService: DataService) {}


   get items(){
     return this.dataService.todo;
   }

   onOpenPopup(item: TodoItem): void {
     const { id } = item;
     this.onChangeActivePopup.emit(id);
   }

   ngOnChanges(changes: SimpleChange): void {
     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
     //Add '${implements OnChanges}' to the class.

   }
}
