import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../servicios/authentication.service';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {provideAnimations} from '@angular/platform-browser/animations';
import { LoggerService } from '../../servicios/logger.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RadioButtonModule, RatingModule, InputTextModule, InputTextareaModule, CheckboxModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  providers: [MessageService, provideAnimations()]
})
export class SurveyComponent {
  genders = ["M", "F", "X"];
  isOpen = false;

  user!: string|undefined|null;
  age!: string;
  phone!: string;
  gender!: string;
  difficulty!: number;
  recommend!: boolean;
  suggestion!: string;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthenticationService);
  router = inject(Router);
  loggerService = inject(LoggerService);

  form = this.formBuilder.nonNullable.group({
    age: ['', [Validators.required, Validators.max(99), Validators.min(18)]],
    phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
    gender: ['', [Validators.required]],
    difficulty:['1', [Validators.required, Validators.max(10), Validators.min(1)]],
    recommend:[true],
    suggestion:['', [Validators.required]]
  });

  constructor(private messageService:MessageService){
    this.authService.user$.subscribe( (value) => this.user = value?.displayName);
  }

  onSubmit(): void{
    const rawForm = this.form.getRawValue();
    if (this.form.valid) {
      if(this.user){
        this.loggerService.newSurvey({
          user: this.user,
          age: parseInt(rawForm.age),
          phone: rawForm.phone,
          gender: rawForm.gender,
          difficulty: parseInt(rawForm.difficulty),
          recommend: rawForm.recommend,
          suggestion: rawForm.suggestion
        });
      }
      this.isOpen = !this.isOpen;
    }else{
      this.form.markAllAsTouched();
    }
  }

  toggleSurvey() {
    this.isOpen = !this.isOpen;
  }  
}
