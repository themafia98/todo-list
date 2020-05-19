import { Component, ViewChild } from '@angular/core';
import { ModalWindowComponent } from './components/modal-window';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ModalWindowComponent) modal: ModalWindowComponent | null = null;
  private titleValue: string = 'Angular todo-list';

  get title(): string {
    return this.titleValue;
  }
}
