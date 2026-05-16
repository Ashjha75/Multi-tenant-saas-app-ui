import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-approval-status',
  imports: [PageHeader, StatusBadge, Button, RouterLink],
  templateUrl: './approval-status.html',
  styleUrl: './approval-status.css',
})
export class ApprovalStatus {}
