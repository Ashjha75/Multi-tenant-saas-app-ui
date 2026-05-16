import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-approval-status',
  imports: [PageHeader, StatusBadge, RouterLink],
  templateUrl: './approval-status.html',
  styleUrl: './approval-status.css',
})
export class ApprovalStatus {}
