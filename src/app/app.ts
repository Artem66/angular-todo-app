import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from './components/todo/todo';
import { Todo as TodoType } from './types/todo';
import { TodoForm } from './components/todo-form/todo-form';
import { FilterActivePipe } from './pipes/filter-active-pipe';
import { TodosService } from './services/todos';
import { Message } from './message/message';
import { MessageService } from './service/message';

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
    Message,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  _todos: TodoType[] = [];
  activeTodos: TodoType[] = [];
  errorMessage = '';

  get todos() {
    return this._todos;
  }

  set todos(todos: TodoType[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter((todo) => !todo.completed);
  }

  constructor(
    private todosService: TodosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.todosService.todos$.subscribe((todos) => {
      this.todos = todos;
    });

    this.todosService.loadTodos().subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to load todos');
      }
    });
  }

  // get activeTodosCount(): number {
  //   return this.todos.filter(todo => !todo.completed).length;
  // }

  trackById(index: number, item: TodoType) {
    return item.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to create todo');
      }
    });
  }

  renameTodo(todo: TodoType, title: string) {
    this.todosService.updateTodo({ ...todo, title }).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to rename todo');
      }
    });
  }

  toggleTodo(todo: TodoType) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed }).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to toggle todo');
      }
    });
  }

  deleteTodo(todo: TodoType) {
    this.todosService.deleteTodo(todo).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to delete todo');
      }
    });
  }
}
