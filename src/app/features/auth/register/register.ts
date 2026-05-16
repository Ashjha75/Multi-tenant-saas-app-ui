import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Input } from '../../../shared/components/input/input';
import { LucideAngularModule, Building2, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Input, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notifier = inject(NotificationService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  
  // Icons
  readonly Building2 = Building2;
  readonly User = User;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly CheckCircle2 = CheckCircle2;
  readonly ArrowRight = ArrowRight;

  readonly registerForm = this.fb.group({
    // Company Info
    companyName: ['', [Validators.required, Validators.minLength(3)]],
    companyCode: ['', [Validators.required, Validators.pattern('^[a-z0-9-]+$')]],
    email: ['', [Validators.required, Validators.email]],
    
    // Admin Info
    adminFullName: ['', [Validators.required]],
    adminUsername: ['', [Validators.required, Validators.minLength(4)]],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: [
      '',
      [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]).{8,}$')
      ],
    ]
  });

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.notifier.error('Please fix the errors in the form.');
      return;
    }

    const rawValue = this.registerForm.getRawValue();
    const payload = {
      companyName: rawValue.companyName ?? '',
      companyCode: rawValue.companyCode ?? '',
      email: rawValue.email ?? '',
      adminFullName: rawValue.adminFullName ?? '',
      adminUsername: rawValue.adminUsername ?? '',
      adminEmail: rawValue.adminEmail ?? '',
      adminPassword: rawValue.adminPassword ?? ''
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
        error: (err) => {
          const msg = err.error?.message || 'Registration failed. Please try again.';
          this.notifier.error(msg);
        },
      });
  }
}
