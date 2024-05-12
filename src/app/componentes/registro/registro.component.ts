import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../servicios/authentication.service';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {provideAnimations} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgClass, CommonModule, ReactiveFormsModule, FormsModule, ToastModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [MessageService, provideAnimations()]
})
export class RegistroComponent{
  email!:string;
  emailRepeat!:string;
  user!:string;
  password!:string;

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthenticationService);
  router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    user: ['', Validators.required],
    email: ['', Validators.required],
    emailRepeat: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMessage:string | null = null;

  constructor(private messageService:MessageService){}

  //FUNCTIONS
  onSubmit(): void{
    const rawForm = this.form.getRawValue();
    this.authService
      .register(rawForm.email, rawForm.user, rawForm.password)
      .subscribe( {next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.code
        this.showError(err.code);
      }
  });
  }

  showError( text: string) {
    let msg;
    console.log('Registro fallido');
    switch (text) {
      case 'auth/email-already-in-use':
        msg = `Dirección de correo ${this.email} en uso.`;
        break;
      case 'auth/invalid-email':
        msg = `Dirección de correo ${this.email} invalida.`;
        break;
      case 'auth/operation-not-allowed':
        msg = `Error durante registro.`;
        break;
      case 'auth/weak-password':
        msg = 'La contraseña es muy debil. Se recomienda agregar numeros y simbolos';
        break;
      default:
        msg = text;
        break;
    }
    this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: text,
    });
  }
}
