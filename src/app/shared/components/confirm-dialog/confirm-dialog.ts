import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [Modal, Button],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  readonly show = input(false);
  readonly title = input('Confirm Action');
  readonly message = input('Are you sure you want to continue?');
  readonly confirmText = input('Confirm');
  readonly cancelText = input('Cancel');
  readonly type = input<'primary' | 'danger'>('primary');
  readonly loading = input(false);

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
