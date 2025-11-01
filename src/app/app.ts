import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from "./components/todo/todo";
import { Todo as TodoType } from './types/todo';
import { TodoForm } from "./components/todo-form/todo-form";
import { FilterActivePipe } from './pipes/filter-active-pipe';

const todosFromServer = [
  { id: '1', title: 'Learn Angular', completed: true },
  { id: '2', title: 'Build a Todo App', completed: false },
  { id: '3', title: 'Master Signals', completed: false },
  { id: '4', title: 'Explore Standalone Components', completed: false },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, Todo, TodoForm, FilterActivePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  _todos: TodoType[] = [];
  activeTodos: TodoType[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: TodoType[]) {
    if (todos === this._todos){
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed);
  }

  constructor() {

  }
  ngOnInit(): void {
    this.todos = todosFromServer;
  }


  // get activeTodosCount(): number {
  //   return this.todos.filter(todo => !todo.completed).length;
  // }

  trackById(index: number, item: TodoType) {
    return item.id;
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
