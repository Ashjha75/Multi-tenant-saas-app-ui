import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PLATFORM_SIDEBAR_ITEMS, WORKSPACE_SIDEBAR_ITEMS } from '../../../core/constants/sidebar.constants';
import { STORAGE_KEYS } from '../../../core/constants/storage.constants';
import { SidebarItem } from '../../../core/models/sidebar-item.model';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly mode = input<'platform' | 'workspace'>('platform');

  constructor(private readonly storage: StorageService) {}

  readonly items = computed<SidebarItem[]>(() => {
    const role = this.storage.get<string>(STORAGE_KEYS.role);
    const allItems = this.mode() === 'platform' ? PLATFORM_SIDEBAR_ITEMS : WORKSPACE_SIDEBAR_ITEMS;

    return allItems.filter((item) => !item.roles?.length || (role ? item.roles.includes(role) : false));
  });
}
