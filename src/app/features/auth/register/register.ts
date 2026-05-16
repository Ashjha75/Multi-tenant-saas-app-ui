import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Select } from '../../../shared/components/select/select';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, PageHeader, Input, Select, Button, StatusBadge],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly step = signal(1);
  readonly loading = signal(false);

  readonly industries = [
    { label: 'Retail', value: 'retail' },
    { label: 'E-commerce', value: 'ecommerce' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Healthcare', value: 'healthcare' },
  ];

  readonly sizes = [
    { label: '1-10', value: '1-10' },
    { label: '11-50', value: '11-50' },
    { label: '51-250', value: '51-250' },
    { label: '250+', value: '250+' },
  ];

  readonly countries = [
    { label: 'United States', value: 'us' },
    { label: 'India', value: 'in' },
    { label: 'United Kingdom', value: 'uk' },
  ];

  readonly companyForm = this.fb.group({
    companyName: ['', [Validators.required]],
    companyCode: ['', [Validators.required, Validators.pattern('^[a-z0-9-]+$')]],
    email: ['', [Validators.required, Validators.email]],
    industry: ['', [Validators.required]],
    companySize: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  readonly adminForm = this.fb.group({
    adminFullName: ['', [Validators.required]],
    adminUsername: ['', [Validators.required]],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$')],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  readonly passwordsMatch = computed(
    () => this.adminForm.value.adminPassword && this.adminForm.value.adminPassword === this.adminForm.value.confirmPassword,
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly notifier: NotificationService,
    private readonly router: Router,
  ) {}

  next(): void {
    if (this.step() === 1) {
      if (this.companyForm.invalid) {
        this.companyForm.markAllAsTouched();
        this.notifier.error('Please complete company details.');
        return;
      }
    }

    if (this.step() === 2) {
      if (this.adminForm.invalid || !this.passwordsMatch()) {
        this.adminForm.markAllAsTouched();
        this.notifier.error('Please complete valid admin details.');
        return;
      }
    }

    this.step.update((value) => Math.min(4, value + 1));
    if (this.step() === 4) {
      this.submit();
    }
  }

  back(): void {
    this.step.update((value) => Math.max(1, value - 1));
  }

  submit(): void {
    const payload = {
      ...this.companyForm.getRawValue(),
      adminFullName: this.adminForm.value.adminFullName ?? '',
      adminEmail: this.adminForm.value.adminEmail ?? '',
      adminUsername: this.adminForm.value.adminUsername ?? '',
      adminPassword: this.adminForm.value.adminPassword ?? '',
    };

    this.loading.set(true);
    this.authService
      .registerTenant(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.notifier.success('Tenant registration submitted successfully.');
          void this.router.navigate(['/approval-status']);
        },
        error: () => {
          this.notifier.error('Registration failed. Please try again.');
          this.step.set(3);
        },
      });
  }
}
