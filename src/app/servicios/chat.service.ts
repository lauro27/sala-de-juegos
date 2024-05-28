import { Injectable, inject } from '@angular/core';
import { Firestore, CollectionReference, addDoc, collection, query, orderBy, collectionData } from '@angular/fire/firestore';
import { ChatMessage } from '../interfaces/chat-message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private db: Firestore = inject(Firestore);
  private msjCollection: CollectionReference;
  constructor() {
    this.msjCollection= collection(this.db, 'messages');
   }

  sendMessage(message: ChatMessage){
    if(message){
      addDoc(this.msjCollection, message)
      .then((result) => {
        console.log(result);
      }).catch( (e) =>{
        console.log(e);
      });
    }
  }

  getMessages(){
    const qry = query(this.msjCollection, orderBy('date', 'asc'));
    return collectionData(qry) as Observable<ChatMessage[]>;
  }
}
