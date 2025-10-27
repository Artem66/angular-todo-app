import { Component, Input } from '@angular/core';
import { Todo as TodoType } from '../../types/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss'
})
export class Todo {
  @Input() todo!: TodoType;

  editing = false;
}
