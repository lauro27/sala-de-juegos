import { Component, Input, inject } from '@angular/core';
import { ChatMessage } from '../../../interfaces/chat-message';
import { AuthenticationService } from '../../../servicios/authentication.service';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
  authService = inject(AuthenticationService);
  @Input() msg: ChatMessage|null = {user:"demo", message:"message", date:Date.now().toString()};
  
}
