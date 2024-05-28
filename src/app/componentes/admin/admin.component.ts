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
  constructor(private loggerService: LoggerService){  }

  ngOnInit(){
    this.loggerService.getSurveys().subscribe(messages => {
      this.surveys = messages;
    });
  }
}
