import { Component, OnInit } from '@angular/core';
import { Card } from '../../../interfaces/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {provideAnimations} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-cardguess',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './cardguess.component.html',
  styleUrl: './cardguess.component.css',
  providers: [MessageService, provideAnimations()]
})
export class CardguessComponent{

  //mechanics
  myDeck:Card[];
  previousCard:Card;
  score:number = 0;

  //site functionality
  buttonDisable:boolean = false;

  //UI
  assetDirectory:string = "../../assets/cards/";
  check:string = "none";
  previousCardDir: string;
  checkDir:string;
  altCard:string = this.assetDirectory + "basecard.png"

  

  constructor(private messageService: MessageService){
    this.myDeck = this.shuffleDeck(this.generateDeck());
    this.previousCard = this.drawDeck(this.myDeck);
    this.previousCardDir = this.assetDirectory + this.previousCard.suit + "/" + this.previousCard.value +".png"
    this.checkDir = this.assetDirectory + this.check + ".png"
  }
  buttonMayor(){
    this.gameplayLoop(true);
  }
  buttonMenor(){
    this.gameplayLoop(false);
  }

  gameplayLoop(action: boolean){
    let newCard: Card;
    
    newCard = this.drawDeck(this.myDeck);
    console.log(""+newCard.value + (action?">":"<") + this.previousCard.value);
    if((action && (parseInt(newCard.value) >= parseInt(this.previousCard.value)))||
        (!action && (parseInt(newCard.value) <= parseInt(this.previousCard.value)))){
      this.score ++;
      this.check = "good";
    }
    else{
      this.check = "bad";
    }
    this.previousCard = newCard;
    this.previousCardDir = this.assetDirectory + this.previousCard.suit + "/" + this.previousCard.value +".png"
    this.checkDir = this.assetDirectory + this.check + ".png"
    console.log(this.previousCardDir);
    if(this.myDeck.length <=0){
      this.buttonDisable = true;
      this.messageService.add({
        severity: 'success',
        sticky: true,
        summary: 'Fin del juego',
        detail: 'Puntaje final: ' + this.score.toString()
      });
    }
  }

  generateDeck(): Card[] {
    const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    const deck: Card[] = [];

    for (const suit of suits) {
        for (const value of values) {
            deck.push({ value, suit });
        }
    }

    return deck;
  }

  shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  drawDeck(deck: Card[]):Card{
    const pop = deck.pop()
    if (pop){
      return pop;
    }
    else{
      return {value:"0",suit:"0"};
    }
  }

  reset(){
    this.myDeck = this.shuffleDeck(this.generateDeck());
    this.previousCard = this.drawDeck(this.myDeck);
    this.score = 0;
    this.check = "none";
    this.previousCardDir = this.assetDirectory + this.previousCard.suit + "/" + this.previousCard.value +".png";
    this.checkDir = this.assetDirectory + this.check + ".png";
    this.buttonDisable = false;
  }

  /*getImg(imgSrcRaw: string) {
    let ref = this.st.ref(imgSrcRaw);
    this.previousCardDir = ref.getDownloadURL();
    return this.previousCardDir;
  }*/
}
