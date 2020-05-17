import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input() popupId: string = '';
  private visibility: boolean = false;

  get id(){
    return this.popupId;
  }

  set visible(value: boolean){
    this.visibility = value;
  }

  get visible(){
    return this.visibility;
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

    if (currentValue && !this.visible){
      this.visible = true;
    }

    if (!currentValue && this.visible){
      this.visible = false;
    }

  }

}
