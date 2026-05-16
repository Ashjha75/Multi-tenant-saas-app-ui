import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Download, List, Clock, ArrowDownCircle, ArrowUpCircle } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Button, Input, Select],
  templateUrl: './stock.html'
})
export class Stock {
  private readonly fb = inject(FormBuilder);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly List = List;
  readonly Clock = Clock;
  readonly ArrowDownCircle = ArrowDownCircle;
  readonly ArrowUpCircle = ArrowUpCircle;

  viewMode: 'table' | 'timeline' = 'table';
  showModal = false;

  typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'in', label: 'Stock IN' },
    { value: 'out', label: 'Stock OUT' }
  ];

  movementOptions = [
    { value: 'in', label: 'Stock IN (Receive)' },
    { value: 'out', label: 'Stock OUT (Dispatch)' }
  ];

  productOptions = [
    { value: 'p1', label: 'Dell XPS 15 (REF-001)' },
    { value: 'p2', label: 'Logitech MX Master (REF-092)' },
    { value: 'p3', label: 'Ergonomic Chair (REF-114)' }
  ];

  filterForm = this.fb.group({
    date: [''],
    type: ['all'],
    user: [''],
    product: ['']
  });

  movementForm = this.fb.group({
    product: [''],
    type: ['in'],
    quantity: [''],
    comment: ['']
  });

  movements = [
    { id: 1, date: '2026-05-16 14:30', product: 'Dell XPS 15', type: 'IN', qty: 50, user: 'Ashish Jha', comment: 'New shipment received' },
    { id: 2, date: '2026-05-16 11:15', product: 'Logitech MX Master', type: 'OUT', qty: 2, user: 'Jane Smith', comment: 'Order #4092' },
    { id: 3, date: '2026-05-15 09:00', product: 'Ergonomic Chair', type: 'IN', qty: 10, user: 'Warehouse Bot', comment: 'Restock' },
    { id: 4, date: '2026-05-14 16:45', product: 'Dell XPS 15', type: 'OUT', qty: 5, user: 'Ashish Jha', comment: 'B2B bulk order' }
  ];

  setView(mode: 'table' | 'timeline') {
    this.viewMode = mode;
  }

  openModal() {
    this.movementForm.reset({ type: 'in' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveMovement() {
    this.showModal = false;
  }
}
