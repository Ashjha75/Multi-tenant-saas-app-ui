import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, Download, Eye, Edit, Trash2, Image as ImageIcon } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Button, Input, Select],
  templateUrl: './products.html'
})
export class Products implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly notifier = inject(NotificationService);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly ImageIcon = ImageIcon;

  showModal = false;
  isLoading = false;

  columns = [
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'reference', label: 'Reference' },
    { key: 'price', label: 'Price' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];

  data: any[] = [];

  categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'furniture', label: 'Furniture' }
  ];

  filterForm = this.fb.group({
    search: [''],
    category: ['all'],
    priceRange: [''],
    lowStock: [false]
  });

  productForm = this.fb.group({
    name: ['', Validators.required],
    reference: ['', Validators.required],
    description: [''],
    price: ['', [Validators.required, Validators.min(0)]],
    alertThreshold: [''],
    categoryId: ['', Validators.required],
    image: ['']
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.data = res.content || res || [];
      },
      error: () => this.notifier.error('Failed to load products')
    });
  }

  openModal() {
    this.productForm.reset();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.notifier.error('Please fill required fields correctly');
      return;
    }

    const payload = this.productForm.value;
    this.isLoading = true;

    this.productService.createProduct(payload).pipe(
      finalize(() => {
        this.isLoading = false;
        this.closeModal();
      })
    ).subscribe({
      next: () => {
        this.notifier.success('Product created successfully');
        this.loadProducts();
      },
      error: () => this.notifier.error('Failed to create product')
    });
  }

  deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.isLoading = true;
    this.productService.deleteProduct(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Product deleted');
        this.loadProducts();
      },
      error: () => this.notifier.error('Failed to delete product')
    });
  }
}
