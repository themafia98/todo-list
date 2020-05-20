import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '.';
import { User } from '../interface';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private session: Subscription | null = null;
  private isLoading: boolean = false;

  constructor(private service: DataService,
    private auth: AngularFireAuth,
    private route: Router) { }

  get dataService() {
    return this.service;
  }

  get loading() {
    return this.isLoading;
  }

  set loading(value: boolean) {
    this.isLoading = value;
  }

  get obsSession() {
    return <Subscription>this.session;
  }

  set obsSession(value: Subscription) {
    this.session = value;
  }

  get router() {
    return this.route;
  }

  startSession() {
    this.obsSession = this.auth.user.subscribe(user => {
      this.loading = true;
      if (!user) {
        this.auth.signOut();
        if (this.router.url !== '/') this.router.navigate(['/']);
      } else if (this.router.url !== '/todoList') {
        this.router.navigate(['/todoList']);
      }
    },
      error => throwError(error),
      () => console.log('listener session init'));
  }

  public async register(formData: User): Promise<firebase.auth.UserCredential | null> {
    try {
      return await this.auth.createUserWithEmailAndPassword(formData.email, formData.password);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async login(formData: User): Promise<firebase.auth.UserCredential | null> {
    try {
      return await this.auth.signInWithEmailAndPassword(formData.email, formData.password);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  ngOnDestroy(): void {
    if (this.obsSession) this.obsSession.unsubscribe();
  }

}
