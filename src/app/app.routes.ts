import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () =>
      import('./components/todos-page/todos-page')
        .then(m => m.TodosPage)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about')
        .then(m => m.About)
  },
  { path: '', redirectTo: 'todos', pathMatch: 'full' }
];
