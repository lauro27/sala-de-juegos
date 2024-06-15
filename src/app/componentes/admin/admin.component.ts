import { Component } from '@angular/core';
import { LoggerService } from '../../servicios/logger.service';

import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  surveys: any[] = [];
  hangmanScores: any[] = [];
  triviaScores: any[] = [];
  blackjackScores: any[] = [];
  cardguessScores: any[] = [];
  constructor(private loggerService: LoggerService){  }

  ngOnInit(){
    this.loggerService.getSurveys().subscribe(messages => {
      this.surveys = messages;
    });
    this.loggerService.getScores("hangman").subscribe(scores => {
      this.hangmanScores = scores;
    });
    this.loggerService.getScores("trivia").subscribe(scores => {
      this.triviaScores = scores;
    });
    this.loggerService.getScores("blackjack").subscribe(scores => {
      this.blackjackScores = scores;
    });
    this.loggerService.getScores("cardguess").subscribe(scores => {
      this.cardguessScores = scores;
    });
  }
}
