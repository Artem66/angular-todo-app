import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos/:filterStatus',
    loadComponent: () =>
      import('./components/todos-page/todos-page')
        .then(m => m.TodosPage)
  },
  { path: '', redirectTo: 'todos/all', pathMatch: 'full' }, 
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about')
        .then(m => m.About)
  }
];