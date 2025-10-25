import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

const todos = [
  { id: '1', title: 'Learn Angular', completed: true },
  { id: '2', title: 'Build a Todo App', completed: false },
  { id: '3', title: 'Master Signals', completed: false },
  { id: '4', title: 'Explore Standalone Components', completed: false },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-todo-app')
  todos = todos;
  editing = false
}
