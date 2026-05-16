import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [NgClass],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  readonly status = input<'active' | 'pending' | 'suspended' | 'danger' | 'success'>('pending');

  readonly statusClass = computed(() => {
    switch (this.status()) {
      case 'active':
      case 'success':
        return 'bg-success/20 text-success border-success/40';
      case 'suspended':
      case 'danger':
        return 'bg-danger/20 text-danger border-danger/40';
      default:
        return 'bg-warning/20 text-warning border-warning/40';
    }
  });
}
