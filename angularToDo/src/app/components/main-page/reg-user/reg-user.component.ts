import { Component, OnInit } from '@angular/core';
import { User } from '../../../interface';

@Component({
  selector: 'reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.scss']
})
export class RegUserComponent implements OnInit {
  private visibleForm: boolean = false;
  private formData: User = {
    email: '',
    password: ''
  };

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
    console.log(this.data);
  }

  onVisibleChange(): void {
    this.visible = !this.visible;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
