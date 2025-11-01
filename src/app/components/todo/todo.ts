import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Todo as TodoType } from '../../types/todo';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Todo implements OnChanges {
  @Output() delete = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Output() rename = new EventEmitter();

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
    this.rename.emit(this.title)
  }
}
