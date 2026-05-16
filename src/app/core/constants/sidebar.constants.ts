import { ROLES } from './role.constants';
import { SidebarItem } from '../models/sidebar-item.model';

export const PLATFORM_SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: 'layout', title: 'Dashboard', route: '/portal/dashboard', roles: [ROLES.platformAdmin, ROLES.administrator] },
  
  // Administration Section
  { icon: 'refresh-cw', title: 'Pending Approvals', route: '/portal/approvals', roles: [ROLES.platformAdmin, ROLES.administrator], section: 'ADMINISTRATION' },
];

export const WORKSPACE_SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: 'grid', title: 'Dashboard', route: '/workspace/dashboard' },
  { icon: 'package', title: 'Products', route: '/workspace/products' },
  { icon: 'layers', title: 'Categories', route: '/workspace/categories' },
  { icon: 'refresh-cw', title: 'Stock Movements', route: '/workspace/stock' },
  { icon: 'users', title: 'Users', route: '/workspace/users' },

  // Administrative tools available in workspace for authorized roles
  { icon: 'refresh-cw', title: 'Pending Approvals', route: '/portal/approvals', roles: [ROLES.platformAdmin, ROLES.administrator], section: 'ADMINISTRATION' },
];
