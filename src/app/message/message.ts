import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../service/message';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.scss'
})
export class Message implements OnInit {
  @Input() title  = 'Error';
  @Input() message = '';

  hidden = true;

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.message$
      .subscribe(text => {
        this.message = text;
        this.hidden = false;
      });
  }
}
