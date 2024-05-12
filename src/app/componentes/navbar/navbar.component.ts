import { Component } from '@angular/core';
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
  constructor(
    private router:Router,
    private authService: AuthenticationService
  ){}

  goLogin(): void{
    this.router.navigate(['/login']);
  }
  goRegistro(): void{
    this.router.navigate(['/registro']);
  }
  logout(): void{
    console.log('logout');
  }
}
