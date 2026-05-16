import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly mode = input<'platform' | 'workspace'>('platform');

  readonly items = computed(() =>
    this.mode() === 'platform'
      ? [
          { label: 'Dashboard', link: '/portal/dashboard' },
          { label: 'Tenants', link: '/portal/tenants' },
          { label: 'Analytics', link: '/portal/analytics' },
        ]
      : [
          { label: 'Dashboard', link: '/workspace/dashboard' },
          { label: 'Products', link: '/workspace/products' },
          { label: 'Inventory', link: '/workspace/inventory' },
          { label: 'Stock Movement', link: '/workspace/stock' },
          { label: 'Reports', link: '/workspace/reports' },
        ],
  );
}
