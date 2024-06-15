import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, collectionData, query, where } from '@angular/fire/firestore';
import { Log } from '../interfaces/log';
import { Score } from '../interfaces/score';
import { Survey } from '../interfaces/survey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private surveyCollection: CollectionReference;
  private scoreCollection: CollectionReference;
  private db: Firestore = inject(Firestore);

  constructor() {
    this.surveyCollection= collection(this.db, 'surveys');
    this.scoreCollection= collection(this.db, 'scores');
   }

  newLog(data: Log ){
    let logsCollection = collection(this.db, "logs");
    console.log(logsCollection);
    addDoc(logsCollection, data);
  }
  newScore(data: Score){
    let logsCollection = collection(this.db, "scores");
    console.log(logsCollection);
    addDoc(logsCollection, data);
  }
  newSurvey(data: Survey){
    let logsCollection = collection(this.db, "surveys");
    console.log(logsCollection);
    addDoc(logsCollection, data);
  }

  getSurveys(){
    const qry = query(this.surveyCollection);
    return collectionData(qry) as Observable<Survey[]>;
  }

  getScores(game: String){
    const qry = query(this.scoreCollection, where("game", "==", game));
    return collectionData(qry) as Observable<Survey[]>;
  }
}
