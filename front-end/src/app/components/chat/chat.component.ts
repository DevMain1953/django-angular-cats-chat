import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})

export class ChatComponent implements OnInit {
  messages: Message [] = [];
  messageInput: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.reloadIfNecessary();
    this.chatService.connect().subscribe((message: any) => {});
    this.chatService.getAll().subscribe(messages => this.messages = messages);
  }

  sendMessage(): void {
    if (this.messageInput.trim() !== '') {
      this.chatService.sendMessage(this.messageInput);
      this.messageInput = '';
      window.location.reload();
    }
  }

  private reloadIfNecessary() {
    var isLoadedBefore = localStorage.getItem('IsLoadedBefore');
    if(isLoadedBefore == 'true') {
       return;
    } else {
      localStorage.setItem('IsLoadedBefore', 'true');
      window.location.reload();
    }
  }
}