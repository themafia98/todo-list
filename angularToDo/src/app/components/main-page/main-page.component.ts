import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface';
//import { User } from 'src/app/interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  private formData: User = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService) { }

  get auth() {
    return this.authService;
  }

  get data() {
    return this.formData;
  }

  get mail() {
    return this.formData.email;
  }

  set mail(value: string) {
    this.formData.email = value;
  }

  get pass() {
    return this.formData.password;
  }

  set pass(value: string) {
    this.formData.password = value;
  }

}
