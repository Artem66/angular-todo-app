import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Todo as TodoType } from '../../types/todo';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss'
})
export class Todo {
  @Output() delete = new EventEmitter();

  @Input() todo!: TodoType;

  @ViewChild('titleField') set titleField(filed: ElementRef) {
    if(filed) {
      filed.nativeElement.focus();
    }
  };

  editing = false;
}
