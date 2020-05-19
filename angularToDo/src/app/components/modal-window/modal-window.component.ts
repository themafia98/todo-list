import { Component, OnInit, SimpleChange, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services';
import { TodoItem } from 'src/app/interface';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Output() onClosePopup: EventEmitter<void> = new EventEmitter<void>();
  private popupId: string = '';
  private visibility: boolean = false;
  private dataDialog: TodoItem | null = null;

  constructor(private service: DataService) { }

  get dataService() {
    return this.service;
  }

  set visible(value: boolean) {
    this.visibility = value;
  }

  get visible() {
    return this.visibility;
  }

  get activePopupId() {
    return this.popupId;
  }

  set activePopupId(id: string) {
    this.popupId = id;
  }

  get data() {
    return this.dataDialog;
  }

  set data(data: TodoItem | null) {
    this.dataDialog = data;
  }

  public delete(evt: MouseEvent): void {
    this.dataService.deleteItem(<string>this.activePopupId);
    this.onVisibilityChange();
  }

  public edit({ value = '', key = '' }) {
    if (this.data) this.dataService.edit(value, key, this.data);
  }

  public onVisibilityChange(event?: MouseEvent | null, _id: string = ''): void {
    const { target = null } = event || {};

    if (target && (<Element>target).className !== 'window') return;

    this.visible = !this.visible;

    if (!this.visible) {
      this.dataDialog = null;
      this.activePopupId = '';
    }
    else if (!this.dataDialog) {
      this.dataDialog = <TodoItem>this.dataService.todo.find(({ id }) => {
        if (_id) return id === _id;
        return id === this.activePopupId;
      });

      if (_id && this.dataDialog) this.activePopupId = _id;
    }

  }

  public ngOnInit(): void {
    this.visible = !!this.activePopupId;
  }

  public ngOnChanges(changes: Record<string, string | SimpleChange>): void {
    const keys: Array<string> = Object.keys(changes);
    const idKey = keys.find(it => it === 'popupId');

    if (!idKey || !changes[idKey]) return;

    const item: SimpleChange = changes[idKey] as SimpleChange;

    const { currentValue, previousValue, firstChange = false } = item;
    if (firstChange || currentValue === previousValue) return;

    if ((currentValue && !this.visible) || (!currentValue && this.visible)) {
      this.onVisibilityChange();
    }
  }
}
