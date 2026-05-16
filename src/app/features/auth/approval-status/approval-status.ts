import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-approval-status',
  standalone: true,
  imports: [StatusBadge, RouterLink],
  templateUrl: './approval-status.html',
  styleUrl: './approval-status.css',
})
export class ApprovalStatus {}
