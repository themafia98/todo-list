import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private titleValue: string = 'Angular todo-list';

  get title(): string {
    return this.titleValue;
  }

}
 