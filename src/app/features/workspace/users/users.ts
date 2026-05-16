import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, UserPlus, Mail, Shield, ShieldCheck, Edit, Trash2, ChevronLeft, ChevronRight, User, Key, Power, UserCheck, UserX } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { Modal } from '../../../shared/components/modal/modal';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Select, Modal, ConfirmDialog],
  templateUrl: './users.html'
})
export class Users implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly notifier = inject(NotificationService);

  readonly UserPlus = UserPlus;
  readonly Mail = Mail;
  readonly Shield = Shield;
  readonly ShieldCheck = ShieldCheck;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly User = User;
  readonly Key = Key;
  readonly Power = Power;
  readonly UserCheck = UserCheck;
  readonly UserX = UserX;
  protected readonly Math = Math;

  showModal = false;
  showConfirmDialog = false;
  isLoading = false;
  modalTitle = 'Invite User';
  modalAction = 'Invite';
  selectedUserId: string | null = null;

  // Pagination Signals
  users = signal<any[]>([]);
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);

  // KPI Computeds
  totalUsers = computed(() => this.totalItems());
  activeUsersCount = computed(() => this.users().filter(u => u.enabled).length);
  adminUsersCount = computed(() => this.users().filter(u => u.role === 'WORKSPACE_ADMIN').length);
  disabledUsersCount = computed(() => this.users().filter(u => !u.enabled).length);

  roleOptions = [
    { value: 'ROLE_COMPANY_ADMIN', label: 'Role Company Admin' },
    { value: 'ROLE_ADMINISTRATOR', label: 'Role Administrator' },
    { value: 'ROLE_USER', label: 'Role User' },
    { value: 'ROLE_SALES_OPERATOR', label: 'Role Sales Operator' }
  ];

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['ROLE_USER', Validators.required],
    password: [''] // Only for creation
  });

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage() - 1, this.pageSize()).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.users.set(res.content || []);
        this.totalItems.set(res.totalElements || res.length || 0);
      },
      error: () => this.notifier.error('Failed to load users')
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers();
  }

  openModal(user?: any) {
    if (user) {
      this.selectedUserId = user.id;
      this.modalTitle = 'Edit User Permissions';
      this.modalAction = 'Update';
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      });
      this.userForm.get('email')?.disable();
      this.userForm.get('password')?.disable();
    } else {
      this.selectedUserId = null;
      this.modalTitle = 'Invite New User';
      this.modalAction = 'Invite';
      this.userForm.reset({ role: 'ROLE_USER' });
      this.userForm.get('email')?.enable();
      this.userForm.get('password')?.enable();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUserId = null;
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = this.userForm.getRawValue();
    const request = this.selectedUserId 
      ? this.userService.updateUser(this.selectedUserId, formValue)
      : this.userService.createUser(formValue);

    request.pipe(finalize(() => this.isLoading = false)).subscribe({
      next: () => {
        this.notifier.success(this.selectedUserId ? 'User updated' : 'User invited successfully');
        this.closeModal();
        this.loadUsers();
      },
      error: () => this.notifier.error('Operation failed')
    });
  }

  toggleStatus(user: any) {
    this.isLoading = true;
    const request = user.enabled 
      ? this.userService.disableUser(user.id)
      : this.userService.enableUser(user.id);

    request.pipe(finalize(() => this.isLoading = false)).subscribe({
      next: () => {
        this.notifier.success(`User ${user.enabled ? 'disabled' : 'enabled'}`);
        this.loadUsers();
      },
      error: () => this.notifier.error('Status change failed')
    });
  }

  deleteUser(id: string) {
    this.selectedUserId = id;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (!this.selectedUserId) return;
    this.isLoading = true;
    this.userService.deleteUser(this.selectedUserId).pipe(
      finalize(() => {
        this.isLoading = false;
        this.showConfirmDialog = false;
      })
    ).subscribe({
      next: () => {
        this.notifier.success('User removed');
        this.loadUsers();
      },
      error: () => this.notifier.error('Delete failed')
    });
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.selectedUserId = null;
  }

  getRoleBadgeClass(role: string) {
    switch (role) {
      case 'ROLE_PLATFORM_ADMIN': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'ROLE_COMPANY_ADMIN': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'ROLE_ADMINISTRATOR': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'ROLE_SALES_OPERATOR': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  }
}
