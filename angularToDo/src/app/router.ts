import { Route } from '@angular/router';
import { TodoPageComponent } from './components/todo-page/todo-page.component';

const route: Array<Route> = [
  { path: 'todoList', component: TodoPageComponent },
  { path: '**', redirectTo: '/'},
];

export default route;
