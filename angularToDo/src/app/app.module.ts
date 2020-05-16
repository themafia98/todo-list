import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ControllersComponent,
    TodoContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
