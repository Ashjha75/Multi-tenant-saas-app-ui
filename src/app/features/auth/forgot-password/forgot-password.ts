import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Mail } from 'lucide-angular';
import { NotificationService } from '../../../core/services/notification.service';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Modal } from '../../../shared/components/modal/modal';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Button, Modal],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  readonly Mail = Mail;
  readonly modalOpen = signal(false);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly notifier: NotificationService,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifier.error('Please enter a valid email.');
      return;
    }

    this.modalOpen.set(true);
  }
}
