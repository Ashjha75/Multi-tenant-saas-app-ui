import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Users, Shield, PieChart, FileClock, Settings, Grid, Package, Layers, Box, RefreshCw, FileText, Bell, ChartBar, LogOut, User } from 'lucide-angular';
import { PLATFORM_SIDEBAR_ITEMS, WORKSPACE_SIDEBAR_ITEMS } from '../../../core/constants/sidebar.constants';
import { STORAGE_KEYS } from '../../../core/constants/storage.constants';
import { SidebarItem } from '../../../core/models/sidebar-item.model';
import { StorageService } from '../../../core/services/storage.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly icons: any = {
    'layout': LayoutDashboard,
    'users': Users,
    'shield': Shield,
    'chart': ChartBar,
    'file-clock': FileClock,
    'settings': Settings,
    'grid': Grid,
    'package': Package,
    'layers': Layers,
    'box': Box,
    'refresh-cw': RefreshCw,
    'file-text': FileText,
    'bell': Bell,
    'logout': LogOut,
    'user': User
  };
  readonly mode = input<'platform' | 'workspace'>('platform');

  constructor(
    private readonly storage: StorageService,
    private readonly auth: AuthService
  ) {}

  readonly LogOut = LogOut;
  readonly User = User;

  logout() {
    this.auth.logout();
  }

  readonly items = computed<SidebarItem[]>(() => {
    const rawRole = this.storage.get<string>(STORAGE_KEYS.role);
    const role = rawRole?.replace(/^"|"$/g, '').trim();
    const allItems = this.mode() === 'platform' ? PLATFORM_SIDEBAR_ITEMS : WORKSPACE_SIDEBAR_ITEMS;

    return allItems.filter((item) => {
      if (!item.roles || item.roles.length === 0) return true;
      if (!role) return false;
      return item.roles.some(r => r.toUpperCase() === role.toUpperCase());
    });
  });
}
