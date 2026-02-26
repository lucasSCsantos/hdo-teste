import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadComponent: () => import('./core/layout/auth/auth.layout').then(m => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadChildren: () => import('./domain/auth/auth.routes').then(m => m.authRoutes),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/dashboard/dashboard.layout').then(m => m.DashboardLayout),
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./domain/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
