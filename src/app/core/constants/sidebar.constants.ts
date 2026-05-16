import { ROLES } from './role.constants';
import { SidebarItem } from '../models/sidebar-item.model';

export const PLATFORM_SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: 'layout', title: 'Dashboard', route: '/portal/dashboard', roles: [ROLES.platformAdmin] },
  { icon: 'users', title: 'Tenants', route: '/portal/tenants', roles: [ROLES.platformAdmin] },
  { icon: 'shield', title: 'Users', route: '/portal/users', roles: [ROLES.platformAdmin] },
  { icon: 'chart', title: 'Analytics', route: '/portal/analytics', roles: [ROLES.platformAdmin] },
  { icon: 'file-clock', title: 'Audit Logs', route: '/portal/audit', roles: [ROLES.platformAdmin] },
  { icon: 'settings', title: 'Settings', route: '/portal/settings', roles: [ROLES.platformAdmin] },
];

export const WORKSPACE_SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: 'grid', title: 'Dashboard', route: '/workspace/dashboard' },
  { icon: 'package', title: 'Products', route: '/workspace/products' },
  { icon: 'layers', title: 'Categories', route: '/workspace/categories' },
  { icon: 'box', title: 'Inventory', route: '/workspace/inventory' },
  { icon: 'refresh-cw', title: 'Stock Movement', route: '/workspace/stock' },
  { icon: 'file-text', title: 'Reports', route: '/workspace/reports' },
  { icon: 'bell', title: 'Notifications', route: '/workspace/notifications' },
  { icon: 'settings', title: 'Settings', route: '/workspace/settings' },
];
