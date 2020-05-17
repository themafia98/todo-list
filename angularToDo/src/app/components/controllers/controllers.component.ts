import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { TodoItem } from '../../interface';

@Component({
  selector: 'controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent {
  @Output() dataChanged: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  private buttonPickerTitle: string = 'pick date';
  private newTodoName: string = '';
  private visiblePicker: boolean = false;

  get todoInput(){
    return this.newTodoName;
  }

  set todoInput(value: string){
    this.newTodoName = value;
  }

  get visibilityPicker(){
    return this.visiblePicker;
  }

  set visibilityPicker(visible: boolean){
    this.visiblePicker = visible;
  }

  get pickerTitle(){
    return this.buttonPickerTitle;
  }

  set pickerTitle(value: string){
    this.buttonPickerTitle = value;
  }

  onChangePickerTitle(day: moment.Moment){
    this.buttonPickerTitle = day.format('DD.MM.YYYY');
  }

  @HostListener("document:click", ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const { target } = event;
    const isPicker: boolean = (target as Element).className === 'pickerDate';

    const parentNode = (target as HTMLElement).parentNode;
    const offParent = (target as HTMLElement).offsetParent;

    const isChild: boolean =
      offParent?.className.includes('custom-calendar') ||
      (<Element>parentNode).className.includes('custom-calendar');

    if ((!isPicker && !isChild) && this.visibilityPicker) this.onChangeVisibility();
  }

  public onChangeVisibility(): void {
    this.visibilityPicker = !this.visibilityPicker;
  }

  public onAdd(event: MouseEvent): void {
    this.dataChanged.emit({
      id: uuid(),
      name: this.todoInput
    });
    this.todoInput = '';
  }

  public onSort(sortType: string): void {
    console.log(sortType);
  }

}
