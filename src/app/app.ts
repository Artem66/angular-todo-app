import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from "./components/todo/todo";
import { Todo as TodoType } from './types/todo';

const todos = [
  { id: '1', title: 'Learn Angular', completed: true },
  { id: '2', title: 'Build a Todo App', completed: false },
  { id: '3', title: 'Master Signals', completed: false },
  { id: '4', title: 'Explore Standalone Components', completed: false },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, Todo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  todos = todos;

  todoForm = new FormGroup({
    title:  new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
    }),
  });


  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo() {
    if(this.todoForm.invalid) {
      return;
    }

    const newTodo: TodoType = {
      id: Date.now().toString(),
      title: this.title.value as string,
      completed: false,
    };

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}
