import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private titleValue: string = 'Angular todo-list';

  constructor(private authService: AuthService) { }

  get auth() {
    return this.authService;
  }

  get title(): string {
    return this.titleValue;
  }

  get loading() {

    return this.auth.loading;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    try {
      this.auth.startSession();
    } catch (error) {
      console.error(error);
    }
  }
}
