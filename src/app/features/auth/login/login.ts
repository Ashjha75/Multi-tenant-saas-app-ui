import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Bell, ChartColumn, Package } from 'lucide-angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule, Input],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notifier = inject(NotificationService);

  readonly loading = signal(false);
  readonly ChartColumn = ChartColumn;
  readonly Package = Package;
  readonly Bell = Bell;

  readonly form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifier.error('Please fill username and password.');
      return;
    }

    this.loading.set(true);
    this.authService
      .login({
        username: this.form.value.username ?? '',
        password: this.form.value.password ?? '',
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.notifier.success('Login successful');
          this.authService.navigatePostLogin(response.role ?? 'ROLE_USER');
        },
        error: () => this.notifier.error('Invalid credentials'),
      });
  }
}
