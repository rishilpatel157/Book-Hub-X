import { Component } from '@angular/core';
import { ChatbotService } from '../service/chatbot.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isChatboxOpen: boolean = false;
  userMessage: string = '';
  messages: { text: string, fromUser: boolean }[] = [];

  constructor(private chatBotService :ChatbotService,private sanitizer: DomSanitizer){ }

  toggleChatbox() {
    
    this.isChatboxOpen = !this.isChatboxOpen;
  }

  onTyping() {
    
  }

  sendMessage() {
    
    const message = { text: this.userMessage, fromUser: true };
    this.messages.push(message);
    
    this.userMessage = '';
    
    this.chatBotService.userPrompt(message.text).subscribe(res =>{
      console.log(res)
      const response = { text: res, fromUser: false };
      
      console.log(response)
      this.messages.push(response);
    })

  }

  
}
