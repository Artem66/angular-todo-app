import { Component, ElementRef, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Todo as TodoType } from '../../types/todo';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss'
})
export class Todo implements OnChanges {
  @Output() delete = new EventEmitter();

  @Input() todo!: TodoType;

  @ViewChild('titleField') set titleField(filed: ElementRef) {
    if(filed) {
      filed.nativeElement.focus();
    }
  };

  editing = false;
  title = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const todoChange = changes['todo'];

    if (todoChange) {
      const prevTitle = todoChange.previousValue?.title;
      const currTitle = todoChange.currentValue?.title;

      console.log(prevTitle);

      if (currTitle && currTitle !== prevTitle) {
        this.title = currTitle;
      }
    }
  }

  edit() {
    this.editing = true;
    this.title = this.todo.title;
  }

  save() {

    if(!this.editing) {
      return
    }

    this.editing = false;
    this.todo.title = this.title;
  }
}
