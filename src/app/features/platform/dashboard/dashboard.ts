import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutDashboard, RefreshCcw, Download, Building2, BadgeCheck, Clock3, Ban, Activity } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { KpiCard } from '../../../shared/components/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, PageHeader, Button, KpiCard],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  readonly LayoutDashboard = LayoutDashboard;
  readonly RefreshCcw = RefreshCcw;
  readonly Download = Download;
  readonly Building2 = Building2;
  readonly BadgeCheck = BadgeCheck;
  readonly Clock3 = Clock3;
  readonly Ban = Ban;
  readonly Activity = Activity;
}
