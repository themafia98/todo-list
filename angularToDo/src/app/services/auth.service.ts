import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private sessionStatus: boolean = false;
  private session: Subscription | null = null;
  private isLoading: boolean = false;

  constructor(private auth: AngularFireAuth,
    private route: Router) { }

  get loading() {
    return this.isLoading;
  }

  get isInitialSession() {
    return this.sessionStatus;
  }

  set isInitialSession(status: boolean) {
    this.sessionStatus = status;
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

  get filterId() {
    const item: string | null = localStorage.getItem('user');
    if (!item) return null;

    const { uid = '' } = JSON.parse(item);
    return uid;
  }

  private async clearSession(): Promise<void> {
    try {
      this.isInitialSession = false;
      localStorage.clear();
      await this.auth.signOut();
    } catch(error){
      console.error(error);
    }
  };

  private saveUser(user: firebase.User) {
    const { displayName, email, uid } = user || {};
    localStorage.setItem('user', JSON.stringify({ displayName, email, uid }));
  }

  startSession(): void {
    this.obsSession = this.auth.user.subscribe(user => {
      this.loading = true;

      if (this.router.url !== '/todoList' && user) {
        this.isInitialSession = true;
        this.saveUser(user);
        return this.router.navigate(['/todoList']);
      } else if (this.router.url !== '/' && !user) {
        if (this.obsSession) this.obsSession.unsubscribe();
        this.router.navigate(['/']);
        return void this.clearSession();
      }

      if (!user) {
        if (this.obsSession) this.obsSession.unsubscribe();
        return void this.clearSession();
      }

      this.isInitialSession = true;
      this.saveUser(user);
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

  public async logOut(): Promise<void> {
    try {
      await this.clearSession();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    if (this.obsSession) this.obsSession.unsubscribe();
  }

}
