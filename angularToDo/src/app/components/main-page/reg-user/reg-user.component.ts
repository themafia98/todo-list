import { Component } from '@angular/core';
import { User } from '../../../interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.scss']
})
export class RegUserComponent {
  private visibleForm: boolean = false;
  private formData: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService){ }

  get auth(){
    return this.authService;
  }


  set mail(value: string) {
    this.formData.email = value;
  }

  get mail() {
    return this.formData.email;
  }

  set password(value: string) {
    this.formData.password = value;
  }

  get password() {
    return this.formData.password;
  }

  get data() {
    return this.formData;
  }

  get visible(){
    return this.visibleForm;
  }

  set visible(value: boolean) {
    this.visibleForm = value;
  }

  onSubmitForm(): void {
    this.auth.register(this.data);
  }

  onVisibleChange(): void {
    this.visible = !this.visible;
  }
}
