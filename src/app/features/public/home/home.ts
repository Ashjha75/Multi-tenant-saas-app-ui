import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Bell, Boxes, ChartColumn, Package, Shield, Users } from 'lucide-angular';
import { Card } from '../../../shared/components/card/card';
import { KpiCard } from '../../../shared/components/kpi-card/kpi-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly ChartColumn = ChartColumn;
  readonly Package = Package;
  readonly Bell = Bell;
  readonly Shield = Shield;
  readonly Boxes = Boxes;
  readonly Users = Users;

  readonly trustedCompanies = ['TechNova', 'Acme', 'NeoCorp', 'RetailX', 'FlowGrid', 'OmniStack'];

  readonly features = [
    { icon: Shield, title: 'Tenant Isolation', description: 'Secure tenant boundaries with workspace-level separation.' },
    { icon: Boxes, title: 'Inventory Control', description: 'Track products, categories, and stock movement in one place.' },
    { icon: Users, title: 'Role Access', description: 'Fine-grained permissions for platform and workspace users.' },
    { icon: ChartColumn, title: 'Analytics', description: 'Real-time KPI visibility with actionable business metrics.' },
    { icon: Package, title: 'Provisioning', description: 'Automated tenant setup from registration to activation.' },
    { icon: Bell, title: 'Alerts', description: 'Low stock and approval events delivered to the right teams.' },
  ];
}
