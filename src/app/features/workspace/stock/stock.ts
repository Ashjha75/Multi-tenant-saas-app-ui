import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, Download, List, Clock, ArrowDownCircle, ArrowUpCircle } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { StockService } from '../../../core/services/stock.service';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Select],
  templateUrl: './stock.html'
})
export class Stock implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly stockService = inject(StockService);
  private readonly productService = inject(ProductService);
  private readonly notifier = inject(NotificationService);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly List = List;
  readonly Clock = Clock;
  readonly ArrowDownCircle = ArrowDownCircle;
  readonly ArrowUpCircle = ArrowUpCircle;

  viewMode: 'table' | 'timeline' = 'table';
  showModal = false;
  isLoading = false;

  typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'IN', label: 'Stock IN' },
    { value: 'OUT', label: 'Stock OUT' }
  ];

  movementOptions = [
    { value: 'IN', label: 'Stock IN (Receive)' },
    { value: 'OUT', label: 'Stock OUT (Dispatch)' }
  ];

  productOptions: { value: string; label: string }[] = [];

  filterForm = this.fb.group({
    date: [''],
    type: ['all'],
    user: [''],
    product: ['']
  });

  movementForm = this.fb.group({
    productId: ['', Validators.required],
    typeMvt: ['IN', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
    comment: ['']
  });

  movements: any[] = [];

  ngOnInit() {
    this.loadProducts();
    this.loadMovements();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        const prods = res.content || res || [];
        this.productOptions = prods.map((p: any) => ({
          value: p.id,
          label: `${p.name} (${p.reference})`
        }));
      }
    });
  }

  loadMovements() {
    this.isLoading = true;
    this.stockService.getMovements().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.movements = res.content || res || [];
      },
      error: () => this.notifier.error('Failed to load stock movements')
    });
  }

  setView(mode: 'table' | 'timeline') {
    this.viewMode = mode;
  }

  openModal() {
    this.movementForm.reset({ typeMvt: 'IN' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveMovement() {
    if (this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      this.notifier.error('Please fill required fields');
      return;
    }

    const formValue = this.movementForm.value;
    const payload = {
      ...formValue,
      dateMvt: new Date().toISOString().split('T')[0] // or full ISO string depending on backend
    };

    this.isLoading = true;
    this.stockService.createMovement(payload).pipe(
      finalize(() => {
        this.isLoading = false;
        this.closeModal();
      })
    ).subscribe({
      next: () => {
        this.notifier.success('Stock movement recorded');
        this.loadMovements();
      },
      error: () => this.notifier.error('Failed to record movement')
    });
  }
}
