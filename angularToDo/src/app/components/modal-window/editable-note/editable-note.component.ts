import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EditableNote, TodoItem } from '../../../interface';
@Component({
  selector: 'editable-note',
  templateUrl: './editable-note.component.html',
  styleUrls: ['./editable-note.component.scss']
})
export class EditableNoteComponent {
  @Output() onEditNote: EventEmitter<EditableNote> = new EventEmitter<EditableNote>();
  @Input() data: TodoItem | null = null;
  private name: string =  'click for add note';
  private editName: string = this.name;
  private mode: string = 'view';

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

  get editValue(){
    return this.editName;
  }

  set editValue(val: string){
    this.editName = val;
  }

  onChange({ currentTarget: { value = '' } = {} }): void {
    if (value !== this.editValue) this.editValue = value;
  };

  onSubmit(event: MouseEvent): void {
    event.stopPropagation();
    this.modeView = 'view';
    this.content = this.editName;
    this.onEditNote.emit({ value: this.editName, key: 'additionalNote'});
  }

  onSwitchMode(event: MouseEvent, mode: string): void {
    event.stopPropagation();
    if (mode === this.modeView) return;
    this.modeView = mode;
  }

  ngOnInit(): void {
    const shouldUpdate = this.data?.additionalNote && this.content !== this.data.additionalNote;

    if (!shouldUpdate || !this.data?.additionalNote) return;

    this.content = this.data.additionalNote;
    this.editName = this.data.additionalNote;
  }

}
