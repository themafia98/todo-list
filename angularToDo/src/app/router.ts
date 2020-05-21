import { Route } from '@angular/router';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
const route: Array<Route> = [
  { path: 'todoList', component: TodoPageComponent },
  { path: '', component: MainPageComponent },
  { path: '**', redirectTo: '/' },
];

export default route;
