import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editable-note',
  templateUrl: './editable-note.component.html',
  styleUrls: ['./editable-note.component.scss']
})
export class EditableNoteComponent implements OnInit {
  private name: string = 'click for add note';
  private mode: string = 'view';

  constructor() { }

  get content(){
    return this.name;
  }

  set content(value: string){
    this.name = value;
  }

  get modeView(){
    return this.mode;
  }

  set modeView(mode: string){
    this.mode = mode;
  }

  onSubmit(): void {
    this.onSwitchMode('view');
  }

  onSwitchMode(mode: string): void {
    if (mode === this.modeView) return;
    this.modeView = mode;
  }

  ngOnInit(): void {
  }

}
