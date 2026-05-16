import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, List, Clock, ArrowDownCircle, ArrowUpCircle, Edit, Trash2, ChevronLeft, ChevronRight, Package, Calendar, User } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { Modal } from '../../../shared/components/modal/modal';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { StockService } from '../../../core/services/stock.service';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Select, Modal, ConfirmDialog],
  templateUrl: './stock.html'
})
export class Stock implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly stockService = inject(StockService);
  private readonly productService = inject(ProductService);
  private readonly notifier = inject(NotificationService);

  readonly Plus = Plus;
  readonly List = List;
  readonly Clock = Clock;
  readonly ArrowDownCircle = ArrowDownCircle;
  readonly ArrowUpCircle = ArrowUpCircle;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Package = Package;
  readonly Calendar = Calendar;
  readonly User = User;
  protected readonly Math = Math;

  viewMode: 'table' | 'timeline' = 'table';
  showModal = false;
  showConfirmDialog = false;
  isLoading = false;
  modalTitle = 'Record Movement';
  modalAction = 'Record';
  selectedMovementId: string | null = null;

  // Pagination Signals
  movements = signal<any[]>([]);
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);

  // KPI Computeds
  totalMovements = computed(() => this.totalItems());
  stockInCount = computed(() => this.movements().filter(m => m.typeMvt === 'IN').length);
  stockOutCount = computed(() => this.movements().filter(m => m.typeMvt === 'OUT').length);
  totalQuantity = computed(() => this.movements().reduce((acc, curr) => acc + (curr.quantity || 0), 0));

  movementOptions = [
    { value: 'IN', label: 'Stock IN (Receive)' },
    { value: 'OUT', label: 'Stock OUT (Dispatch)' }
  ];

  productOptions = signal<{ value: string; label: string }[]>([]);

  movementForm = this.fb.group({
    productId: ['', Validators.required],
    typeMvt: ['IN', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
    comment: ['']
  });

  ngOnInit() {
    this.loadProducts();
    this.loadMovements();
  }

  loadProducts() {
    this.productService.getProducts(0, 1000).subscribe({
      next: (res) => {
        const prods = res.content || res || [];
        this.productOptions.set(prods.map((p: any) => ({
          value: p.id,
          label: `${p.name} (${p.reference})`
        })));
      }
    });
  }

  loadMovements() {
    this.isLoading = true;
    this.stockService.getMovements(this.currentPage() - 1, this.pageSize()).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.movements.set(res.content || []);
        this.totalItems.set(res.totalElements || res.length || 0);
      },
      error: () => this.notifier.error('Failed to load stock movements')
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadMovements();
  }

  openModal(movement?: any) {
    if (movement) {
      this.selectedMovementId = movement.id;
      this.modalTitle = 'Edit Movement';
      this.modalAction = 'Update';
      this.movementForm.patchValue({
        productId: movement.productId,
        typeMvt: movement.typeMvt,
        quantity: movement.quantity,
        comment: movement.comment
      });
    } else {
      this.selectedMovementId = null;
      this.modalTitle = 'Record Movement';
      this.modalAction = 'Record';
      this.movementForm.reset({ typeMvt: 'IN' });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedMovementId = null;
  }

  saveMovement() {
    if (this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload = { ...this.movementForm.value, dateMvt: new Date().toISOString() };
    const request = this.selectedMovementId 
      ? this.stockService.updateMovement(this.selectedMovementId, payload)
      : this.stockService.createMovement(payload);

    request.pipe(finalize(() => this.isLoading = false)).subscribe({
      next: () => {
        this.notifier.success(this.selectedMovementId ? 'Movement updated' : 'Movement recorded');
        this.closeModal();
        this.loadMovements();
      },
      error: () => this.notifier.error('Operation failed')
    });
  }

  deleteMovement(id: string) {
    this.selectedMovementId = id;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (!this.selectedMovementId) return;
    this.isLoading = true;
    this.stockService.deleteMovement(this.selectedMovementId).pipe(
      finalize(() => {
        this.isLoading = false;
        this.showConfirmDialog = false;
      })
    ).subscribe({
      next: () => {
        this.notifier.success('Movement deleted');
        this.loadMovements();
      },
      error: () => this.notifier.error('Delete failed')
    });
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.selectedMovementId = null;
  }
}
