import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Download, Box, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Select],
  templateUrl: './inventory.html'
})
export class Inventory {
  private readonly fb = inject(FormBuilder);

  readonly Download = Download;
  readonly Box = Box;
  readonly TrendingDown = TrendingDown;
  readonly TrendingUp = TrendingUp;
  readonly AlertTriangle = AlertTriangle;
  readonly CheckCircle2 = CheckCircle2;

  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'low', label: 'Low Stock' },
    { value: 'critical', label: 'Critical / Out' }
  ];

  filterForm = this.fb.group({
    search: [''],
    category: [''],
    status: ['all']
  });

  inventoryItems = [
    { id: 1, product: 'Dell XPS 15', sku: 'REF-001', category: 'Laptops', qty: 45, threshold: 10, location: 'Aisle 4, Shelf 2', status: 'Healthy' },
    { id: 2, product: 'Logitech MX Master', sku: 'REF-092', category: 'Accessories', qty: 8, threshold: 15, location: 'Aisle 2, Shelf 1', status: 'Low' },
    { id: 3, product: 'Ergonomic Chair', sku: 'REF-114', category: 'Furniture', qty: 0, threshold: 5, location: 'Warehouse B', status: 'Critical' }
  ];
}
