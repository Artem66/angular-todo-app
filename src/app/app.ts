import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  trackById(index: number, item: TodoType) {
    return item.id;
  }

  handleFormSubmit() {
    if(this.todoForm.invalid) {
      return;
    }

    this.addTodo(this.title.value);
    this.todoForm.reset();
  }

  addTodo(newTitle: string){
    const newTodo: TodoType = {
      id: Date.now().toString(),
      title: newTitle,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
  }

  renameTodo(todoId: string, title: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title, }
    })
  }

  toggleTodo(todoId: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed, }
    })
  }

  deleteTodo(todoId: string) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }
}
