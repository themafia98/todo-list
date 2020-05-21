import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ModalWindowComponent } from '../modal-window';
import DataService from 'src/app/services/data.service';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnDestroy {
  @ViewChild(ModalWindowComponent) modal: ModalWindowComponent | null = null;
  private titleValue: string = 'Angular todo-list';
  constructor(private dataService: DataService) { }

  get title(): string {
    return this.titleValue;
  }

  ngOnInit(): void {
    this.dataService.start();
  }

  ngOnDestroy(): void {
    this.dataService.dispoise();
  }
}
