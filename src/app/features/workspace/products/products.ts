import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, Download, Eye, Edit, Trash2, Image as ImageIcon } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, Select, ConfirmDialog],
  templateUrl: './products.html'
})
export class Products implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly notifier = inject(NotificationService);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly ImageIcon = ImageIcon;

  showModal = false;
  isLoading = false;
  selectedProductId: string | null = null;
  modalTitle = 'Add Product';
  modalAction = 'Save Product';

  showConfirmDialog = false;
  productToDelete: string | null = null;

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

  data = signal<any[]>([]);
  categoryOptions = signal<{ value: string; label: string }[]>([{ value: 'all', label: 'All Categories' }]);

  filterForm = this.fb.group({
    search: [''],
    category: ['all'],
    priceRange: [''],
    lowStock: [false]
  });

  filteredData = computed(() => {
    const filters = this.filterForm.value;
    return this.data().filter(item => {
      let matches = true;
      if (filters.search) {
        matches = matches && item.name.toLowerCase().includes(filters.search.toLowerCase());
      }
      if (filters.category && filters.category !== 'all') {
        matches = matches && (item.category?.id === filters.category || item.categoryId === filters.category);
      }
      if (filters.lowStock) {
        matches = matches && (item.stock <= (item.alertThreshold || 5));
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(n => Number(n.trim()));
        if (!isNaN(min) && item.price < min) matches = false;
        if (!isNaN(max) && item.price > max) matches = false;
      }
      return matches;
    });
  });

  totalProducts = computed(() => this.data().length);
  inventoryValue = computed(() => this.data().reduce((acc, item) => acc + (item.price * (item.stock || 0)), 0));
  lowStockCount = computed(() => this.data().filter(item => item.stock > 0 && item.stock <= (item.alertThreshold || 5)).length);
  outOfStockCount = computed(() => this.data().filter(item => item.stock === 0).length);

  productForm = this.fb.group({
    name: ['', Validators.required],
    reference: ['', Validators.required],
    description: [''],
    price: ['', [Validators.required, Validators.min(0)]],
    alertThreshold: [''],
    categoryId: ['', Validators.required]
  });

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();

    this.filterForm.valueChanges.subscribe(() => {
    });
  }

  loadCategories() {
    this.categoryService.getCategories(0, 1000).subscribe({
      next: (res) => {
        const categories = res.content || res || [];
        const options = [{ value: 'all', label: 'All Categories' }, ...categories.map((c: any) => ({
          value: c.id,
          label: c.name
        }))];
        this.categoryOptions.set(options);
      }
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.data.set(res.content || res || []);
      },
      error: () => this.notifier.error('Failed to load products')
    });
  }

  openModal() {
    this.selectedProductId = null;
    this.modalTitle = 'Add Product';
    this.modalAction = 'Save Product';
    this.productForm.reset();
    this.showModal = true;
  }

  editProduct(product: any) {
    this.selectedProductId = product.id;
    this.modalTitle = 'Edit Product';
    this.modalAction = 'Update Product';
    this.productForm.patchValue({
      name: product.name,
      reference: product.reference,
      description: product.description,
      price: product.price,
      alertThreshold: product.alertThreshold,
      categoryId: product.categoryId || product.category?.id
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProductId = null;
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.notifier.error('Please fill required fields correctly');
      return;
    }

    const payload = this.productForm.value;
    this.isLoading = true;

    if (this.selectedProductId) {
      this.productService.updateProduct(this.selectedProductId, payload).pipe(
        finalize(() => {
          this.isLoading = false;
          this.closeModal();
        })
      ).subscribe({
        next: () => {
          this.notifier.success('Product updated successfully');
          this.loadProducts();
        },
        error: () => this.notifier.error('Failed to update product')
      });
    } else {
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
  }

  deleteProduct(id: string) {
    this.productToDelete = id;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (!this.productToDelete) return;
    this.showConfirmDialog = false;
    this.isLoading = true;
    this.productService.deleteProduct(this.productToDelete).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Product deleted');
        this.productToDelete = null;
        this.loadProducts();
      },
      error: () => {
        this.notifier.error('Failed to delete product');
        this.productToDelete = null;
      }
    });
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.productToDelete = null;
  }
}
