import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AuthenticationService } from './servicios/authentication.service';
import { ChatComponent } from './componentes/chat/chat.component';
import { SurveyComponent } from './componentes/survey/survey.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, NavbarComponent, ChatComponent, SurveyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  authenticationService = inject(AuthenticationService);
  title = 'Sala-de-juegos';

  ngOnInit(): void{
    this.authenticationService.user$.subscribe(user =>{
      if(user){
        this.authenticationService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        })
      } else {
        this.authenticationService.currentUserSig.set(null);
      }
      console.log(this.authenticationService.currentUserSig());
    });
  }
}
