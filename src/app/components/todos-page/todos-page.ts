import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../todo/todo';
import { Todo as TodoType } from '../../types/todo';
import { TodoForm } from '../todo-form/todo-form';
import { FilterActivePipe } from '../../pipes/filter-active-pipe';
import { TodosService } from '../../services/todos';
import { Message } from '../message/message';
import { MessageService } from '../../service/message';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [
    // RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Todo,
    TodoForm,
    // FilterActivePipe,
    Message,
  ],
  templateUrl: './todos-page.html',
})
export class TodosPage implements OnInit {
  errorMessage = '';

  constructor(private todosService: TodosService, private messageService: MessageService) {}

  todos$!: Observable<TodoType[]>;
  activeTodos$!: Observable<TodoType[]>;
  activeCount$!: Observable<number>;

  ngOnInit() {
    this.todos$ = this.todosService.todos$;
    this.activeTodos$ = this.todos$.pipe(map((todos) => todos.filter((todo) => !todo.completed)));
    this.activeCount$ = this.activeTodos$.pipe(map((todos) => todos.length));

    this.todosService.loadTodos().subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to load todos');
      },
    });
  }

  trackById(index: number, item: TodoType) {
    return item.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to create todo');
      },
    });
  }

  renameTodo(todo: TodoType, title: string) {
    this.todosService.updateTodo({ ...todo, title }).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to rename todo');
      },
    });
  }

  toggleTodo(todo: TodoType) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed }).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to toggle todo');
      },
    });
  }

  deleteTodo(todo: TodoType) {
    this.todosService.deleteTodo(todo).subscribe({
      error: (err) => {
        this.messageService.showMessage('Failed to delete todo');
      },
    });
  }
}
