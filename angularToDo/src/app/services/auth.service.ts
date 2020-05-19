import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '.';
import { User } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service: DataService,
    private auth: AngularFireAuth) { }

  get dataService() {
    return this.service;
  }


  async register(formData: User): Promise<firebase.auth.UserCredential | null> {
    try {
      return await this.auth.createUserWithEmailAndPassword(formData.email, formData.password);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async login(formData: User){
    try {
    return await this.auth.signInWithEmailAndPassword(formData.email, formData.password);
    } catch(error){
      console.error(error);
    }
  }


}
