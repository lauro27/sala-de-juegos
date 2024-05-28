import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from '../../servicios/authentication.service';
import { LoggerService } from '../../servicios/logger.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService, provideAnimations()]
})
export class LoginComponent {
  email!:string;
  password!:string;

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthenticationService);
  loggerService = inject(LoggerService);

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private messageService:MessageService){}

  //FUNCTIONS
  onSubmit(): void{
    const rawForm = this.form.getRawValue();
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe( {next: () => {
        this.loggerService.newLog(
          {
            email: rawForm.email,
            action: "Inicio de sesión exitoso de usuario",
            date: new Date().toISOString()
          });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.showError(err.code);
      }
  });
  }

  debugUser():void{
    this.authService
      .login("user@gmail.com", "password")
      .subscribe( {next: () => {
        this.loggerService.newLog(
          {
            email: "user@gmail.com",
            action: "Inicio de sesión exitoso de usuario",
            date: new Date().toISOString()
          });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
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
      case 'auth/invalid-credential':
        msg = 'Usuario o contraseña incorrectos';
        break;
      default:
        msg = "Error de inicio de sesión";
        break;
    }
    this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: text,
    });
  }
}
