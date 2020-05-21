import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TodoItem, UserExist } from '../interface';
import * as moment from 'moment';
import { Observable, Subscription, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export default class DataService implements OnDestroy {

  private sort: string = 'all';
  private todoList: Array<TodoItem> = [];
  private sub: Subscription | null = this.onSub();
  private observer: Observable<TodoItem[]> | null = null;

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) {
    this.queryList();
  }

  get sortType() {
    return this.sort;
  }

  get auth() {
    return this.authService;
  }

  set sortType(type: string) {
    this.sort = type;
  }

  get obs() {
    return this.observer;
  }

  get store() {
    return this.firestore;
  }

  get todo() {
    return this.todoList;
  }

  private onSub(): Subscription | null {
    if (!this.obs) return null;
    return this.obs.subscribe((items: Array<TodoItem>) => {
      this.todoList = items.sort((a, b) => {
        return moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix()
      });
    },
      (error: Error) => {
        console.error(error);
        throwError(error);
      });
  }

  public onSort(type: string): void {
    this.sortType = type;
  }

  public async edit(value: string, key: string, data: TodoItem) {
    try {
      const result = await this.firestore.collection('todos').ref.where("id", "==", data?.id).get();
      if (!result.docs.length) throw new Error("no data for delete");
      for await (let doc of result.docs) {
        await this.firestore.collection('todos').doc(doc.id).update({
          [key]: value
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public addItem(item: TodoItem): void {
    this.firestore.collection('todos').add(item)
      .catch(error => console.error(error));
  }

  public async deleteItem(id: string): Promise<void> {
    try {
      const result = await this.firestore.collection('todos').ref.where("id", "==", id).get();
      if (!result.docs.length) throw new Error("no data for delete");
      for await (let doc of result.docs) {
        await this.firestore.collection('todos').doc(doc.id).delete();
      }
    } catch (err) {
      console.error(err);
    }
  }

  queryList(): void {
    const item: string | null = localStorage.getItem('user');
    if (!item) return;

    const user: UserExist = <UserExist>JSON.parse(item);
    if (!user) return;

    const { uid } = user;
    this.observer = this.firestore.collection<TodoItem>('todos', ref => ref.where("uid", "==", uid)).valueChanges();

    if (!this.sub) this.onSub();

  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
