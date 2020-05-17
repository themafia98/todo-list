import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TodoItem } from '../interface';
import * as moment from 'moment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export default class DataService {

  private todoList: Array<TodoItem>;
  private observer: Observable<TodoItem[]>;

  constructor(private firestore: AngularFirestore){
    this.todoList = [];
    this.observer = this.firestore.collection<TodoItem>('todos').valueChanges();
    this.init();
  }

  get obs(){
    return this.observer;
  }

  get store(){
    return this.firestore;
  }

  get todo(){
    return this.todoList;
  }

  private init(): void {
    this.obs.subscribe((items: Array<TodoItem>) => {
      this.todoList = items.sort((a, b) => {
        return moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix()
      });
    },
    (error: Error) => console.error(error));
  }

  public addItem(item: TodoItem): void {
    this.firestore.collection('todos').add(item)
    .catch(error => console.error(error));
  }

  public async deleteItem(id: string): Promise<void> {
    try{
      const result = await this.firestore.collection('todos').ref.where("id", "==", id).get();
      if (!result.docs.length)  throw new Error("no data for delete");
      for await (let doc of result.docs){
        await this.firestore.collection('todos').doc(doc.id).delete();
      }
    } catch(err){
      console.error(err);
    }
  }
}
