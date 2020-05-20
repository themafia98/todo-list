import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private session: Subscription | null = null;
  private isLoading: boolean = false;

  constructor(private auth: AngularFireAuth,
              private route: Router) { }

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

  get filterId(){
    const item: string | null = localStorage.getItem('user');
    if (!item) return null;

    const { uid = '' } = JSON.parse(item);
    return uid;
  }

  startSession() {
    this.obsSession = this.auth.user.subscribe(user => {
      this.loading = true;
      if (!user) {

        localStorage.clear();
        this.auth.signOut();

        if (this.router.url !== '/')
          return this.router.navigate(['/']);

      } else if (this.router.url !== '/todoList')
        this.router.navigate(['/todoList']);
      const { displayName, email, uid } = user || {};

      localStorage.setItem('user', JSON.stringify({ displayName, email, uid }));
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
