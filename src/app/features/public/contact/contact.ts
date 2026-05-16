import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { NotificationService } from '../../../core/services/notification.service';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, PageHeader, Input, Button, NgxSkeletonLoaderComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly notifier = inject(NotificationService);

  readonly loading = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifier.error('Please fix form errors before submitting.');
      return;
    }

    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.notifier.success('Message sent successfully. We will contact you soon.');
      this.form.reset();
    }, 1000);
  }
}
