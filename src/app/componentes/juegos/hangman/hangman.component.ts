import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HangmanButton } from '../../../interfaces/hangman-button';
import { HangmanService } from '../../../servicios/hangman.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoggerService } from '../../../servicios/logger.service';
import { AuthenticationService } from '../../../servicios/authentication.service';

const maxAttempts: number = 6;
const assetDirectory:string = "../../../../assets/hangman/";
const letters: string[] = [
  'A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
const wordApi: string = "https://clientes.api.greenborn.com.ar/public-random-word";

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css',
  providers: [MessageService, provideAnimations()]
})
export class HangmanComponent {
  authService = inject(AuthenticationService);
  loggerService = inject(LoggerService);
  user:string|undefined|null;

  //mechanics
  word :string = "";
  wordArray: string[] = [];
  Letterbuttons: HangmanButton[] = [];
  attempts:number = 0;
  gameEnd: boolean = false;
  

  //UI
  attemptsDir: string = assetDirectory + this.attempts + ".png";
  displayWord:string[] = [];

  constructor(private messageService: MessageService, private hangmanService:HangmanService){
    this.authService.user$.subscribe( (value) => this.user = value?.displayName);
    this.hangmanService.getPalabra().subscribe(result => {
      this.word = result[0].toUpperCase();
      this.word = this.word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      console.log(this.word);
      this.word = this.word.toUpperCase();
      this.wordArray = Array.from(this.word);
      
      this.wordArray.forEach(element => { this.displayWord.push("_");  });
      
    });

    
    
    
    letters.forEach(l => {
      this.Letterbuttons.push({letter:l, used:false});
    });
  }

  gameplayLoop(inputLetter: string){
    let lbId = this.Letterbuttons.findIndex(lb => lb.letter == inputLetter)
    this.Letterbuttons[lbId].used = true;
    let result = this.wordArray.map((letterWord,index) => letterWord == inputLetter? index:null);
    let resultfiltered: number[] = result.filter((item): item is number => item !== null);
    if (resultfiltered.length>0) {
      resultfiltered.forEach(element => {
        this.displayWord[element] = inputLetter;
        if(this.displayWord.indexOf("_") == -1){
          this.triggerWinState();
        }
      });
    }else{
      this.attempts++;
      if(this.attempts>= maxAttempts){
        this.triggerFailState()
      }
    }
    console.log(this.displayWord);
    this.attemptsDir = assetDirectory + this.attempts+ ".png";

  }


  triggerWinState(){
    if(this.user){
      this.loggerService.newScore({
        user: this.user, 
        score: this.attempts,
        game: "hangman",
        date: Date.now().toString()
    });}
    this.messageService.add({
      severity: 'success',
      sticky: true,
      summary: 'Victoria!',
      detail: 'intentos restantes: ' + (6 - this.attempts)
    });
    this.Letterbuttons.forEach(element => {
      element.used = true;
    });
    this.gameEnd = true;
  }

  triggerFailState(){
    if(this.user){
      this.loggerService.newScore({
        user: this.user, 
        score: this.attempts,
        game: "hangman",
        date: Date.now().toString()
    });}
    this.messageService.add({
      severity: 'error',
      sticky: true,
      summary: 'Derrota!',
      detail: 'La palabra era ' + this.word
    });
    this.Letterbuttons.forEach(element => {
      element.used = true;
    });
    this.gameEnd = true;
  }

  reset(){
    this.hangmanService.getPalabra().subscribe(result => {
      this.word = result[0].toUpperCase();
      this.word = this.word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      console.log(this.word);
      this.word = this.word.toUpperCase();
      this.wordArray = [];
      this.wordArray = Array.from(this.word);
      this.displayWord =[];
      console.log("word array: "+this.wordArray);
      this.wordArray.forEach(element => {
        console.log("elemento: " + element);
        this.displayWord.push("_"); 
      });  
      
    });
    this.attempts = 0;
    
    
    
    
    this.Letterbuttons = [];
    letters.forEach(l => {
      this.Letterbuttons.push({letter:l, used:false});
    });
    this.attemptsDir = assetDirectory + this.attempts+ ".png";
  }
  

}
