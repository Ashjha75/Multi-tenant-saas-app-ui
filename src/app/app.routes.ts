import { Routes } from '@angular/router';
import { ROLES } from './core/constants/role.constants';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { tenantGuard } from './core/guards/tenant.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      { path: '', loadComponent: () => import('./features/public/home/home').then((m) => m.Home) },
      {
        path: 'features',
        loadComponent: () => import('./features/public/features/features').then((m) => m.Features),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./features/public/pricing/pricing').then((m) => m.Pricing),
      },
      { path: 'price', redirectTo: 'pricing', pathMatch: 'full' },
      { path: 'about', loadComponent: () => import('./features/public/about/about').then((m) => m.About) },
      {
        path: 'contact',
        loadComponent: () => import('./features/public/contact/contact').then((m) => m.Contact),
      },
      { path: 'login', loadComponent: () => import('./features/auth/login/login').then((m) => m.Login) },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
      },
      {
        path: 'approval-status',
        loadComponent: () =>
          import('./features/auth/approval-status/approval-status').then((m) => m.ApprovalStatus),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
    ],
  },
  {
    path: 'portal',
    canActivate: [authGuard, roleGuard],
    data: { roles: [ROLES.platformAdmin] },
    loadComponent: () => import('./layout/platform-layout/platform-layout').then((m) => m.PlatformLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/platform/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'tenants',
        loadComponent: () => import('./features/platform/tenants/tenants').then((m) => m.Tenants),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/platform/users/users').then((m) => m.Users),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/platform/analytics/analytics').then((m) => m.Analytics),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/platform/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  {
    path: 'workspace',
    canActivate: [authGuard, tenantGuard],
    loadComponent: () => import('./layout/workspace-layout/workspace-layout').then((m) => m.WorkspaceLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/workspace/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'products',
        loadComponent: () => import('./features/workspace/products/products').then((m) => m.Products),
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/workspace/categories/categories').then((m) => m.Categories),
      },
      {
        path: 'stock',
        loadComponent: () => import('./features/workspace/stock/stock').then((m) => m.Stock),
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/workspace/inventory/inventory').then((m) => m.Inventory),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/workspace/reports/reports').then((m) => m.Reports),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/workspace/notifications/notifications').then((m) => m.Notifications),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/workspace/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
