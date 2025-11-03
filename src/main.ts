// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // ✅ Correct provider for Angular 20 + Vite
  ],
}).catch(err => console.error(err));
