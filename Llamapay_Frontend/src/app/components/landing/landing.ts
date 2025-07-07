import { Component, OnInit } from '@angular/core';
import { IaApiService } from '../../services/iaapi.service';
import { PpgsApiService } from '../../services/ppgsapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing  {
  
  chatOpen = false;
  userInput = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  articles: any[] = [];
  loadingnews = true;
  error = '';
  
  constructor(
    private ppgsApi:PpgsApiService,
    private hfService: IaApiService
  ) {}

  pagar(){
    this.ppgsApi.redirectToCheckout();
  }

  sendMessage() {
  if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.push({ from: 'user', text: userMsg });
    this.userInput = '';

    this.hfService.sendToAI(userMsg).subscribe({
      next: res => {
      console.log('Respuesta IA:', res);
      const reply = res?.choices?.[0]?.message?.content || 'No entendí tu pregunta.';
      const formatted = reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      this.messages.push({ from: 'bot', text: formatted });
    },
      error: () => {
        this.messages.push({ from: 'bot', text: 'Hubo un error al procesar tu mensaje.' });
      }
    });
  }

  scrollTo(id: string, event: Event) {
    event.preventDefault(); // evita el salto arriba del todo
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    const navbar = document.getElementById('navbar');
    navbar?.scrollIntoView({ behavior: 'smooth' });
  }


}




