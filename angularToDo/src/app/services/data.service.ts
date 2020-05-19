import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TodoItem } from '../interface';
import * as moment from 'moment';
import { Observable, Subscription, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export default class DataService implements OnDestroy {

  private sort: string;
  private todoList: Array<TodoItem>;
  private sub: Subscription;
  private observer: Observable<TodoItem[]>;

  constructor(private firestore: AngularFirestore) {
    this.sort = 'all';
    this.todoList = [];
    this.observer = this.firestore.collection<TodoItem>('todos').valueChanges();
    this.sub = this.onSub();
  }

  get sortType() {
    return this.sort;
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

  private onSub(): Subscription {
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

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
