import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Users, Shield, PieChart, FileClock, Settings, Grid, Package, Layers, Box, RefreshCw, FileText, Bell, ChartBar } from 'lucide-angular';
import { PLATFORM_SIDEBAR_ITEMS, WORKSPACE_SIDEBAR_ITEMS } from '../../../core/constants/sidebar.constants';
import { STORAGE_KEYS } from '../../../core/constants/storage.constants';
import { SidebarItem } from '../../../core/models/sidebar-item.model';
import { StorageService } from '../../../core/services/storage.service';

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
    'bell': Bell
  };
  readonly mode = input<'platform' | 'workspace'>('platform');

  constructor(private readonly storage: StorageService) {}

  readonly items = computed<SidebarItem[]>(() => {
    const role = this.storage.get<string>(STORAGE_KEYS.role);
    const allItems = this.mode() === 'platform' ? PLATFORM_SIDEBAR_ITEMS : WORKSPACE_SIDEBAR_ITEMS;

    return allItems.filter((item) => !item.roles?.length || (role ? item.roles.includes(role) : false));
  });
}
