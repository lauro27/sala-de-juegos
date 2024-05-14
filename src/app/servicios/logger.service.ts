import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Log } from '../interfaces/log';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private firestore: Firestore) { }

  newLog(data: Log, tabla:string){
    let logsCollection = collection(this.firestore, tabla);
    console.log(logsCollection);
    addDoc(logsCollection, data);
  }
}
