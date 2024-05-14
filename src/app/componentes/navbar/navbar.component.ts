import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../servicios/authentication.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthenticationService);

  constructor(
    private router:Router
  ){}

  goHome():void{
    this.router.navigate(['/home']);
  }

  goLogin(): void{
    this.router.navigate(['/login']);
  }
  goRegistro(): void{
    this.router.navigate(['/registro']);
  }
  logout(): void{
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  goAbout():void{
    this.router.navigate(['/about']);
  }
}
