import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'todos/:filterStatus',
    renderMode: RenderMode.Prerender,
    getPrerenderParams() {
      return Promise.resolve([
        { filterStatus: 'all' },
        { filterStatus: 'active' },
        { filterStatus: 'completed' }
      ]);
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
