import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ControllersWrapperComponent } from './controllers-wrapper/controllers-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ControllersWrapperComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
