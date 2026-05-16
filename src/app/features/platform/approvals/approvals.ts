import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Building2, Check, X, Eye, Search, Filter, AlertCircle, RefreshCw } from 'lucide-angular';
import { TenantService } from '../../../core/services/tenant.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadge, ConfirmDialog],
  templateUrl: './approvals.html',
})
export class Approvals implements OnInit {
  private readonly tenantService = inject(TenantService);
  private readonly notifier = inject(NotificationService);

  readonly loading = signal(false);
  readonly data = signal<any[]>([]);
  readonly stats = signal({ pending: 0, reviewedToday: 0 });

  // Icons
  readonly Building2 = Building2;
  readonly Check = Check;
  readonly X = X;
  readonly Eye = Eye;
  readonly Search = Search;
  readonly Filter = Filter;
  readonly AlertCircle = AlertCircle;
  readonly RefreshCw = RefreshCw;

  // Dialog state
  showConfirm = false;
  confirmType: 'approve' | 'reject' = 'approve';
  selectedTenant: any = null;
  processingAction = false;

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending(): void {
    this.loading.set(true);
    this.tenantService.getPendingTenants()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.data.set(res.content || res || []);
          this.stats.set({ 
            pending: this.data().length,
            reviewedToday: 0 // This would come from another API in a real app
          });
        },
        error: () => this.notifier.error('Failed to load pending requests.')
      });
  }

  openConfirm(tenant: any, type: 'approve' | 'reject'): void {
    this.selectedTenant = tenant;
    this.confirmType = type;
    this.showConfirm = true;
  }

  handleConfirm(): void {
    if (!this.selectedTenant) return;
    
    this.processingAction = true;
    const action$ = this.confirmType === 'approve' 
      ? this.tenantService.approveTenant(this.selectedTenant.id)
      : this.tenantService.suspendTenant(this.selectedTenant.id);

    action$.pipe(finalize(() => {
      this.processingAction = false;
      this.showConfirm = false;
    })).subscribe({
      next: () => {
        this.notifier.success(`Tenant ${this.confirmType === 'approve' ? 'approved' : 'rejected'} successfully.`);
        this.loadPending();
      },
      error: (err) => {
        this.notifier.error(err.error?.message || `Failed to ${this.confirmType} tenant.`);
      }
    });
  }
}
