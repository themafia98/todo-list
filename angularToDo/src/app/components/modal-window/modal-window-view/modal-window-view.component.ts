import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/interface';
import { DataService } from 'src/app/services';

@Component({
  selector: 'modal-window-view',
  templateUrl: './modal-window-view.component.html',
  styleUrls: ['./modal-window-view.component.scss']
})
export class ModalWindowViewComponent {
  @Output() onChageVisibility: EventEmitter<void> = new EventEmitter<void>();
  @Input('serviceData') data: TodoItem | null = null;
  @Input() popupId: string | null = null;


  constructor (private service: DataService){}

  delete(evt: MouseEvent){
    this.service.deleteItem(<string>this.popupId);

    this.onChageVisibility.emit();
  }

}
