import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from "./components/todo/todo";
import { Todo as TodoType } from './types/todo';
import { TodoForm } from "./components/todo-form/todo-form";
import { FilterActivePipe } from './pipes/filter-active-pipe';
import { TodosService } from './services/todos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Todo,
    TodoForm,
    FilterActivePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private todosService: TodosService
  ) {

  }
  ngOnInit(): void {
    this.todosService.todos$
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  // get activeTodosCount(): number {
  //   return this.todos.filter(todo => !todo.completed).length;
  // }

  trackById(index: number, item: TodoType) {
    return item.id;
  }

  addTodo(newTitle: string){
    this.todosService.createTodo(newTitle)
      .subscribe();

    // this.todos = [...this.todos, newTodo];
  }

  renameTodo(todo: TodoType, title: string) {
    this.todosService.updateTodo({ ...todo, title })
      .subscribe();
  }

  toggleTodo(todo: TodoType) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed })
  }

  deleteTodo(todo: TodoType) {
    this.todosService.deleteTodo(todo)
      .subscribe();
  }
}
