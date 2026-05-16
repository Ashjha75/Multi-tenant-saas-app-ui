import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LucideAngularModule, Plus, Download, Search, Eye, Check, Play, Pause, MoreVertical, Ban } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { TenantService } from '../../../core/services/tenant.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Select, StatusBadge, ConfirmDialog],
  templateUrl: './tenants.html'
})
export class Tenants implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tenantService = inject(TenantService);
  private readonly notifier = inject(NotificationService);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Check = Check;
  readonly Play = Play;
  readonly Pause = Pause;
  readonly MoreVertical = MoreVertical;
  readonly Ban = Ban;

  showApproveModal = false;
  isApproving = false;
  selectedTenantId: string | null = null;
  isLoading = false;

  columns = [
    { key: 'companyName', label: 'Company' },
    { key: 'companyCode', label: 'Code' },
    { key: 'adminEmail', label: 'Email' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];

  data: any[] = [];

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

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.isLoading = true;
    this.tenantService.getTenants().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.data = res.content || res || [];
      },
      error: () => this.notifier.error('Failed to load tenants')
    });
  }

  openApproveModal(id: string) {
    this.selectedTenantId = id;
    this.showApproveModal = true;
  }

  closeApproveModal() {
    if (!this.isApproving) {
      this.showApproveModal = false;
      this.selectedTenantId = null;
    }
  }

  approveTenant() {
    if (!this.selectedTenantId) return;
    
    this.isApproving = true;
    this.tenantService.approveTenant(this.selectedTenantId).pipe(
      finalize(() => {
        this.isApproving = false;
        this.closeApproveModal();
      })
    ).subscribe({
      next: () => {
        this.notifier.success('Tenant approved successfully');
        this.loadTenants();
      },
      error: () => this.notifier.error('Failed to approve tenant')
    });
  }

  activateTenant(id: string) {
    this.isLoading = true;
    this.tenantService.activateTenant(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Tenant activated');
        this.loadTenants();
      },
      error: () => this.notifier.error('Failed to activate tenant')
    });
  }

  deactivateTenant(id: string) {
    this.isLoading = true;
    this.tenantService.deactivateTenant(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Tenant deactivated');
        this.loadTenants();
      },
      error: () => this.notifier.error('Failed to deactivate tenant')
    });
  }

  showConfirmDialog = false;
  tenantToSuspend: string | null = null;

  suspendTenant(id: string) {
    this.tenantToSuspend = id;
    this.showConfirmDialog = true;
  }

  confirmSuspend() {
    if (!this.tenantToSuspend) return;
    this.showConfirmDialog = false;
    this.isLoading = true;
    this.tenantService.suspendTenant(this.tenantToSuspend).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Tenant suspended');
        this.tenantToSuspend = null;
        this.loadTenants();
      },
      error: () => {
        this.notifier.error('Failed to suspend tenant');
        this.tenantToSuspend = null;
      }
    });
  }

  cancelSuspend() {
    this.showConfirmDialog = false;
    this.tenantToSuspend = null;
  }
}
