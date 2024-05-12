import { Component } from '@angular/core';
import { TriviaOption } from '../../../interfaces/trivia-option';
import { PokemonService } from '../../../servicios/pokemon.service';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

const maxDex = 1024;
const maxQuestion = 10;
@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule, ToastModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
  providers: [MessageService, provideAnimations()]
})
export class TriviaComponent {
  //mechanics
  options:TriviaOption[] = [];
  currentQuestion: number = 1;
  answers: string[] = [];
  score: number = 0;
  gameEnd:boolean = false;

  //ui
  triviaImg: string = "";
  assetDirectory:string = "../../../../assets/cards/";

  constructor(private messageService: MessageService, private pokemonService:PokemonService){
    this.fetchPokemon();
    this.answers = ["none","none","none","none","none","none","none","none","none","none"]
  }

  answerQuestion(answer:boolean){
    this.answers[this.currentQuestion-1] = answer? "good":"bad";
    if (answer){this.score++;}
    if(this.currentQuestion>=maxQuestion){
      this.triggerEndGame();
    }
    else{
      this.currentQuestion++;
      this.fetchPokemon();
    }
  }

  triggerEndGame(){
    this.messageService.add({
      severity: 'success',
      sticky: true,
      summary: 'Fin del juego!',
      detail: 'Acertaste ' + this.score + " de 10"
    });
    this.gameEnd = true;
  }


  fetchPokemon(){
    this.options = []
    let numbers:number[] = this.getRandomNumbers();
    let first = true;
    numbers.forEach(element => {
      this.pokemonService.getPokemon(element).subscribe((result:any) => {

        this.options.push(
            {
              name: result.pokemon.name.toUpperCase(),
              spriteUrl: result.sprites.front_default,
              correct: first
            }
          );
          if (first){
            this.triviaImg = result.sprites.front_default;
          }
          first = false;  //shuffle
          for (let i = this.options.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [this.options[i], this.options[j]] = [this.options[j], this.options[i]];
          }

          let find;
      });
    });
    console.log(this.options);
    
  }

  getRandomNumbers() {
    const numbers: number[] = [];
    while (numbers.length < 4) {
      const randomNum = Math.floor((Math.random() * maxDex)+1); // Genera un número aleatorio entre 0 y 9
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
  }

  reset(){
    this.fetchPokemon();
    this.answers = ["none","none","none","none","none","none","none","none","none","none"];
    this.gameEnd= false;
    this.currentQuestion = 1;
    this.score = 0;
  }
}
