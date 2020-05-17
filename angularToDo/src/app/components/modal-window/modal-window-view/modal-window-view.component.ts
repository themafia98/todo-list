import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from 'src/app/interface';

@Component({
  selector: 'modal-window-view',
  templateUrl: './modal-window-view.component.html',
  styleUrls: ['./modal-window-view.component.scss']
})
export class ModalWindowViewComponent implements OnInit {
  @Input('serviceData') data: TodoItem | null = null;

  ngOnInit(): void {
  }

}
