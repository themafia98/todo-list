import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services';
import { TodoItem } from 'src/app/interface';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input() popupId: string = '';
  @Output() onClosePopup: EventEmitter<void> = new EventEmitter<void>();
  private visibility: boolean = false;
  private dataDialog: TodoItem | null = null;

  constructor(private service: DataService){}

  get dataService(){
    return this.service;
  }

  get id(){
    return this.popupId;
  }

  set visible(value: boolean){
    this.visibility = value;
  }

  get visible(){
    return this.visibility;
  }

  get data(){
    return this.dataDialog;
  }

  set data(data: TodoItem | null){
    this.dataDialog = data;
  }

  onVisibilityChange(event?: MouseEvent){
    const { target = null } = event || {};
    if (target && (<Element>target).className !== 'window') return;

    this.visible = !this.visible;

    if (!this.visible) {
      this.dataDialog = null;
      this.onClosePopup.emit();
    }
    else if (!this.dataDialog){
      this.dataDialog = <TodoItem>this.dataService.list.find(({ id }) => id === this.id);
    }
  }

  ngOnInit(): void {
    this.visible = !!this.id;
  }

  ngOnChanges(changes: Record<string, string | SimpleChange>): void {
    const keys: Array<string> = Object.keys(changes);
    const idKey = keys.find(it => it === 'popupId');

    if (!idKey || !changes[idKey]) return;

    const item: SimpleChange = changes[idKey] as SimpleChange;

    const { currentValue, previousValue, firstChange = false } = item;
    if (firstChange || currentValue === previousValue) return;

    if ((currentValue && !this.visible) || (!currentValue && this.visible)){
      this.onVisibilityChange();
    }


  }

}
