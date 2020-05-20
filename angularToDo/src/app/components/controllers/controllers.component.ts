import { Component, HostListener } from '@angular/core';
import { v4 as uuid } from 'uuid';
import DataService from '../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent {
  private selectDate: moment.Moment | null = null;
  private newTodoName: string = '';
  private visiblePicker: boolean = false;

  constructor(private service: DataService,
              private authService: AuthService) { }

  get dataService() {
    return this.service;
  }

  get auth() {
    return this.authService;
  }

  get todoInput() {
    return this.newTodoName;
  }

  set todoInput(value: string) {
    this.newTodoName = value;
  }

  get visibilityPicker() {
    return this.visiblePicker;
  }

  get day() {
    return this.selectDate;
  }

  set visibilityPicker(visible: boolean) {
    this.visiblePicker = visible;
  }

  public onChangePickerTitle(day: moment.Moment) {
    this.selectDate = day;
    this.onChangeVisibility();
  }

  @HostListener("document:click", ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const { target } = event;
    const isPicker: boolean = (target as Element)?.className === 'pickerDate';

    const parentNode = (target as HTMLElement)?.parentNode;
    const offParent = (target as HTMLElement)?.offsetParent;

    const isChild: boolean =
      offParent?.className?.includes('custom-calendar') ||
      (<Element>parentNode)?.className?.includes('custom-calendar');

    if ((!isPicker && !isChild) && this.visibilityPicker) this.onChangeVisibility();
  }

  public onChangeVisibility(): void {
    this.visibilityPicker = !this.visibilityPicker;
  }

  public onAdd(event: MouseEvent): void {
    if (this.todoInput && this.selectDate)
      this.dataService.addItem({
        uid: this.auth.filterId,
        id: uuid(),
        name: this.todoInput,
        date: this.selectDate.format('DD.MM.YYYY')
      });
    this.todoInput = '';
  }

  public onSort(sortType: string): void {
    if (!sortType) return;

    this.dataService.onSort(sortType);
  }
}
