import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import DataService from './services/data.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MomentPipe } from './pipes/moment.pipe';
import { AngularFireModule } from '@angular/fire';
import { environment } from './environment';
import { TodoItemColorDirective } from './directive/todo-item-color.directive';
import { SortableListPipe } from './pipes/sortable-list.pipe';
import { EditableNoteComponent } from './components/modal-window/editable-note/editable-note.component';
import router from './router';
import { RouterModule } from '@angular/router';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegUserComponent } from './components/main-page/reg-user/reg-user.component';
import { AngularFireAuthModule  } from "@angular/fire/auth";
import { LoaderComponent } from './components/loader/loader.component';
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
    EditableNoteComponent,
    TodoPageComponent,
    MainPageComponent,
    RegUserComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
