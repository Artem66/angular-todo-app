import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../service/message';
import { text } from 'stream/consumers';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.scss'
})
export class Message implements OnInit, OnDestroy {
  @Input() title  = 'Error';
  @Input() message = '';

  destroy$$ = new Subject();
  hidden = true;

  constructor(
    private messageService: MessageService
  ) {}
  ngOnDestroy(): void {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }

  ngOnInit(): void {
    this.messageService.message$.pipe(
      takeUntil(this.destroy$$)
    )
      .subscribe(text => {
        console.log(2);
        
        this.message = text;
        this.hidden = false;
      });
  }
}
