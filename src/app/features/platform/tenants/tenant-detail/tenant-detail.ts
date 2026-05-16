import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Building2, Download, RefreshCcw, Activity, Shield, Users, Box, HardDrive, Edit, Play, Pause } from 'lucide-angular';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { Button } from '../../../../shared/components/button/button';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { KpiCard } from '../../../../shared/components/kpi-card/kpi-card';
import { DataTable } from '../../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-tenant-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadge, KpiCard, DataTable],
  templateUrl: './tenant-detail.html'
})
export class TenantDetail {
  readonly Building2 = Building2;
  readonly Play = Play;
  readonly Pause = Pause;
  readonly Edit = Edit;

  activeTab = 'overview';

  usersCols = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' }
  ];

  usersData = [
    { name: 'John Doe', role: 'Admin', email: 'john@acme.com', status: 'active' },
    { name: 'Jane Smith', role: 'User', email: 'jane@acme.com', status: 'active' }
  ];

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
