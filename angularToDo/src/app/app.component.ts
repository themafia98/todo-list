import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private titleValue: string = 'Angular todo-list';
  private activePopupId: string = '';


  get title(): string {
    return this.titleValue;
  }

  get popupId() {
    return this.activePopupId;
  }

  set popupId(id: string) {
    this.activePopupId = id;
  }

  public onSetActiveId(id: string): void {
    this.popupId = id;
  }

  public onClosePopup(): void {
    this.popupId = '';
  }
}
