import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient){}

  getTodos () {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
  }
}
