import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
   userMessage: string = '';
      chatMessages: any[] = [];
  
      sendMessage() {
          const trimmedMessage = this.userMessage.trim();
          if (trimmedMessage !== '') {
              this.addUserMessage(trimmedMessage);
              this.respondToUser(trimmedMessage);
              this.userMessage = '';
          }
      }
  
      addUserMessage(content: string) {
          this.chatMessages.push({ content, isSentByUser: true });
      }
  
      addBotMessage(content: string) {
          this.chatMessages.push({ content, isSentByUser: false });
      }
  
      respondToUser(userMessage: string) {
          // Replace this with your chatbot logic
          setTimeout(() => {
              this.addBotMessage('This is a response from the chatbot.');
          }, 500);
      }
  
      toggleChatbox() {
          // Add logic to toggle the chatbox visibility
      }
  
}
