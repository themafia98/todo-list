import { Component, OnInit } from '@angular/core';
//import { User } from 'src/app/interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private email: string = '';
  private password: string = '';


  get mail() {
    return this.email;
  }

  set mail(value: string){
    this.email = value;
  }

  get pass() {
    return this.password;
  }

  set pass(value: string){
    this.password = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
