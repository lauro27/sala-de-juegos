import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Card } from '../../../interfaces/card';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../../servicios/logger.service';
import { AuthenticationService } from '../../../servicios/authentication.service';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css',
  providers: [MessageService, provideAnimations()]
})
export class BlackjackComponent {
  authService = inject(AuthenticationService);
  loggerService = inject(LoggerService);
  user:string|undefined|null;

  //MECHANICS
  myDeck:Card[] = []; //deck of cards
  myHand:Card[] = []; 
  dealerHand:Card[] = []; 

  myScore:number = 0;
  dealerScore: number = 0;
  currentRound:number = 1;
  maxRound:number = 10;

  myFinished = false;// check if player either overshot or stood
  roundEnd = false;// after dealer is done
  gameFinished = false;// after rounds are done

  //UI
  assetDirectory:string = "../../assets/cards/";
  myHandDir: string[] = [];
  dealerHandDir: string[] = [];
  myHandScore: number = 0;
  dealerHandScore: number = 0;


  constructor(private messageService: MessageService){
    this.authService.user$.subscribe( (value) => this.user = value?.displayName);
    console.log("game start");
    this.roundStart();
  }

  //GAMEPLAY
  resetGame(){
    this.myScore = 0;
    this.dealerScore = 0;
    this.currentRound = 1;
    this.maxRound = 10;
    this.gameFinished = false;
    this.roundStart();
  }


  roundStart(){
    this.myHand = [];
    this.dealerHand = []
    this.myDeck = this.generateDeck();
    this.shuffleDeck(this.myDeck);
    this.myHand.push(this.drawDeck(this.myDeck));
    this.dealerHand.push(this.drawDeck(this.myDeck));
    this.myHand.push(this.drawDeck(this.myDeck));
    this.myFinished = false;
    this.roundEnd = false;
    if(this.calculateScore(this.myHand) == 21){
      this.myFinished = true;
      this.roundEnd = true;
    }
    this.renderCards();
  }

  myGameplayLoop(hit:boolean){
    if(hit){
      this.myHand.push(this.drawDeck(this.myDeck));
      if(this.calculateScore(this.myHand) > 21){
        this.myFinished = true;
        this.roundEnd = true;
        this.roundVictory(false);
      }
      else{

      }
    }else{
      this.myFinished = true;
    }
    this.renderCards();
  }

  dealerGameplayLoop(next:boolean){ //datazo, continue es palabra protegida
    if(next){
      console.log(this.dealerHand);
      console.log(this.myHand);
      console.log((this.calculateScore(this.dealerHand) >= this.calculateScore(this.myHand)));
      this.dealerHand.push(this.drawDeck(this.myDeck));
      if(this.calculateScore(this.dealerHand) > 21){
        this.roundEnd = true;
        this.roundVictory(true);
      }
      else{
        if(this.calculateScore(this.dealerHand) >= this.calculateScore(this.myHand)){
          this.roundEnd = true;
          this.roundVictory(false);
        }
      }
    }else{
      this.roundStart();
    }
    this.renderCards();
  }

  roundVictory(yours: boolean){
    //add score to winner
    if(yours){this.myScore++;}
    else{this.dealerScore++;}
    //check if the game is done
    if(this.currentRound>=this.maxRound){
      this.gameFinished=true;
      let victory = this.myScore >= this.dealerScore;
      if(this.user){
        this.loggerService.newScore({
          user: this.user, 
          score: this.myScore,
          game: "blackjack",
          date: Date.now().toString()
      });}
      this.messageService.add({
        severity: victory?'success':'error',
        sticky: true,
        summary: 'Fin del juego',
        detail: victory? "Tu ganas":"La casa gana"
      });
      //TODO: register score
    }else{
      this.currentRound++;
    }
  }
  //CARD HANDLING
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

  calculateScore(hand:Card[]){
    let sum = 0;
    let acesCount = 0;
    for (let card of hand) {
      let value = parseInt(card.value);
      if (value >= 2 && value <= 10) {
        sum += value;
      } else if (value === 11 || value === 12 || value === 13) {
        sum += 10;
      } else if (value === 1) {
        // Ace
        sum += 11;
        acesCount += 1;
      }
    }

    // Adjust for Aces if necessary
    while (sum > 21 && acesCount > 0) {
      sum -= 10;
      acesCount -= 1;
    }

    return sum;
  }

  renderCards(){
    this.myHandDir = [];
    this.dealerHandDir = [];
    this.myHand.forEach(element => {
      this.myHandDir.push(this.assetDirectory + element.suit + "/" + element.value + ".png");
    });
    this.dealerHand.forEach(element =>{
      this.dealerHandDir.push(this.assetDirectory + element.suit + "/" + element.value + ".png");
    });
    this.myHandScore = this.calculateScore(this.myHand);
    this.dealerHandScore = this.calculateScore(this.dealerHand);
  }
}
