import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadComponent: () => import('./core/layout/auth/auth.layout').then(m => m.AuthLayout),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/auth/auth.routes').then(m => m.authRoutes),
      },
    ],
  },
];
