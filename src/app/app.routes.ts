import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { About } from './features/public/about/about';
import { Contact } from './features/public/contact/contact';
import { FeaturesPage } from './features/public/features-page/features-page';
import { Home } from './features/public/home/home';
import { Pricing } from './features/public/pricing/pricing';
import { Analytics as PlatformAnalytics } from './features/platform/analytics/analytics';
import { Dashboard as PlatformDashboard } from './features/platform/dashboard/dashboard';
import { Tenants } from './features/platform/tenants/tenants';
import { Dashboard as WorkspaceDashboard } from './features/workspace/dashboard/dashboard';
import { Inventory } from './features/workspace/inventory/inventory';
import { Products } from './features/workspace/products/products';
import { Reports } from './features/workspace/reports/reports';
import { Stock } from './features/workspace/stock/stock';
import { PlatformLayout } from './layout/platform-layout/platform-layout';
import { PublicLayout } from './layout/public-layout/public-layout';
import { WorkspaceLayout } from './layout/workspace-layout/workspace-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'features', component: FeaturesPage },
      { path: 'price', component: Pricing },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: 'portal',
    component: PlatformLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: PlatformDashboard },
      { path: 'tenants', component: Tenants },
      { path: 'analytics', component: PlatformAnalytics },
    ],
  },
  {
    path: 'workspace',
    component: WorkspaceLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: WorkspaceDashboard },
      { path: 'products', component: Products },
      { path: 'inventory', component: Inventory },
      { path: 'stock', component: Stock },
      { path: 'reports', component: Reports },
    ],
  },
  { path: '**', redirectTo: '' },
];
