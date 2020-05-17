import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TodoItem } from '../interface';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export default class DataService {

  private todoList: Array<TodoItem>;

  constructor(private firestore: AngularFirestore){
    this.todoList = [];
    this.firestore.collection<TodoItem>('todos').valueChanges()
      .subscribe((items: Array<TodoItem>) => {
        this.todoList = items.sort((a, b) => moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix());
      });
  }

  get store(){
    return this.firestore;
  }

  get todo(){
    return this.todoList;
  }

  addItem(item: TodoItem){
    this.firestore.collection('todos').add(item);
  }

  async deleteItem(id: string){
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
