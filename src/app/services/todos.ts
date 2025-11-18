import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, map, Observable, ReplaySubject, Subject, switchMap, take, tap, withLatestFrom } from 'rxjs';

const todosFromServer: Todo[] = [
  { id: '1', title: 'Learn Angular', completed: true },
  { id: '2', title: 'Build a Todo App', completed: false },
  { id: '3', title: 'Master Signals', completed: false },
  { id: '4', title: 'Explore Standalone Components', completed: false },
];

const USER_ID = '5382';
const API_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos$$.asObservable();



  constructor(private http: HttpClient){
  }

  loadTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`)
      .pipe(
        tap((todos) => this.todos$$.next(todos))
      );
  }

  getTodos () {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      title,
      userId: USER_ID,
      completed: false,
    })
      .pipe(
        withLatestFrom(this.todos$),
        tap(([createTodo, todos]) => {
          this.todos$$.next(
            [...todos, createTodo ]
          )
        })
      );
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo)
      
      .pipe(
        withLatestFrom(this.todos$),
        tap(([updateTodo, todos]) => {
          this.todos$$.next(
            todos.map(todo => todo.id === updateTodo.id ? updateTodo : todo)
          )
        })
      );
  }

  deleteTodo({ id }: Todo) {
    return this.http.delete<Todo>(`${API_URL}/todos/${id}`)
      .pipe(
        withLatestFrom(this.todos$),
        tap(([_, todos]) => {
          this.todos$$.next(
            todos.filter(todo => todo.id !== id)
          )
        })
      );
  }

  clearCompleted() {
    return this.todos$.pipe(
      take(1),
      map(todos => ({
        todos,
        completed: todos.filter(t => t.completed)
      })),
      switchMap(({ todos, completed }) =>
        forkJoin(
          completed.map(({ id }) =>
            this.http.delete(`${API_URL}/todos/${id}`)
          )
        ).pipe(
          tap(() => {
            this.todos$$.next(
              todos.filter(t => !t.completed)
            );
          })
        )
      )
    );
  }
}
