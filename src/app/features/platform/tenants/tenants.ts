import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LucideAngularModule, Plus, Download, Search, Eye, Check, Play, Pause, MoreVertical } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Modal } from '../../../shared/components/modal/modal';

interface TenantData {
  company: string;
  code: string;
  admin: string;
  email: string;
  users: number;
  createdAt: string;
  status: 'active' | 'pending' | 'suspended';
}

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Button, Input, Select, StatusBadge],
  templateUrl: './tenants.html'
})
export class Tenants {
  private readonly fb = inject(FormBuilder);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Check = Check;
  readonly Play = Play;
  readonly Pause = Pause;
  readonly MoreVertical = MoreVertical;

  showApproveModal = false;
  isApproving = false;

  columns = [
    { key: 'company', label: 'Company' },
    { key: 'code', label: 'Code' },
    { key: 'admin', label: 'Admin' },
    { key: 'email', label: 'Email' },
    { key: 'users', label: 'Users' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];

  data: TenantData[] = [
    { company: 'Acme Corp', code: 'ACME', admin: 'John Doe', email: 'john@acme.com', users: 24, createdAt: '2026-05-15', status: 'active' },
    { company: 'TechNova', code: 'TECH', admin: 'Jane Smith', email: 'jane@technova.com', users: 0, createdAt: '2026-05-16', status: 'pending' },
    { company: 'Global Logis', code: 'GLOB', admin: 'Bob Ross', email: 'bob@global.com', users: 120, createdAt: '2026-01-10', status: 'suspended' }
  ];

  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  filterForm = this.fb.group({
    search: [''],
    status: ['all'],
    dateRange: [''],
    companyCode: ['']
  });

  constructor() {}

  openApproveModal() {
    this.showApproveModal = true;
  }

  closeApproveModal() {
    if (!this.isApproving) {
      this.showApproveModal = false;
    }
  }

  approveTenant() {
    this.isApproving = true;
    setTimeout(() => {
      this.isApproving = false;
      this.showApproveModal = false;
    }, 2000);
  }
}
