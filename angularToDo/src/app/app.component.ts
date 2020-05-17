import { Component } from '@angular/core';
import { TodoItem } from './interface';
import { DataService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private titleValue: string = 'Angular todo-list';
  private activePopupId: string = '';

  constructor(private dataService: DataService){}

  get title(): string {
    return this.titleValue;
  }

  get popupId(){
    return this.activePopupId;
  }

  set popupId(id: string){
    this.activePopupId = id;
  }

  public onSetActiveId(id: string): void {
    this.popupId = id;
  }

  public onClosePopup(): void {
    this.popupId = '';
  }

  public dataChangeHandler(item: TodoItem): void {
    this.dataService.addItem(item);
  }
}
