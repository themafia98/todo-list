import { Component, ViewChild } from '@angular/core';
import { ModalWindowComponent } from '../modal-window';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {
  @ViewChild(ModalWindowComponent) modal: ModalWindowComponent | null = null;
  private titleValue: string = 'Angular todo-list';
  constructor() { }


  get title(): string {
    return this.titleValue;
  }
}
