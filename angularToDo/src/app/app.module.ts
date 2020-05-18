import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { DataService } from './services';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MomentPipe } from './pipes/moment.pipe';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { TodoItemColorDirective } from './directive/todo-item-color.directive';
import { SortableListPipe } from './pipes/sortable-list.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ControllersComponent,
    TodoContainerComponent,
    ModalWindowComponent,
    CalendarComponent,
    MomentPipe,
    TodoItemColorDirective,
    SortableListPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
