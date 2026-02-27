import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
];
