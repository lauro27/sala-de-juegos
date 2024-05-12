import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router);

  goHangman(){
    this.router.navigateByUrl('/game/hangman');
  }
  goTrivia(){
    this.router.navigateByUrl('/game/trivia');
  }
  goCardGuess(){
    this.router.navigateByUrl('/game/cardguess');
  }
  goCustom(){
    this.router.navigateByUrl('/');
  }

}
