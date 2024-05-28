import { Component, inject } from '@angular/core';
import { ChatMessage } from '../../interfaces/chat-message';
import { ChatService } from '../../servicios/chat.service';
import { MensajeComponent } from './mensaje/mensaje.component';
import { AuthenticationService } from '../../servicios/authentication.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, MensajeComponent, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  renderChat: Boolean = false;
  authService = inject(AuthenticationService);
  user:string|undefined|null;
  message = "";
  messages: any[] = [];

  constructor(private chatService: ChatService){
    this.authService.user$.subscribe( (value) => this.user = value?.displayName);
  }

  ngOnInit(){
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }
  sendMessage(){
    console.log(this.user);
    if(this.user && this.message != ""){
      let msg: ChatMessage = {user:this.user, message: this.message, date: Date.now().toString()}
      this.chatService.sendMessage(msg);
    }
  }

  toggleChat(){
    this.renderChat = !this.renderChat;
  }
}
