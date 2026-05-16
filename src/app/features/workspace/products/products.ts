import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, Download, Eye, Edit, Trash2, Image as ImageIcon, Box } from 'lucide-angular';
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

  protected readonly Math = Math;
  readonly Plus = Plus;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly ImageIcon = ImageIcon;
  readonly Box = Box;

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

  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);

  data = signal<any[]>([]);
  categoryOptions = signal<{ value: string; label: string }[]>([]);

  // KPIs based on current page data as requested
  totalProducts = computed(() => this.data().length);
  inventoryValue = computed(() => this.data().reduce((acc, item) => acc + (Number(item.price || 0) * (item.stock || 0)), 0));
  lowStockCount = computed(() => this.data().filter(item => item.stock > 0 && item.stock <= (item.alertThreshold || 10)).length);
  outOfStockCount = computed(() => this.data().filter(item => (item.stock || 0) === 0).length);

  productForm = this.fb.group({
    name: ['', Validators.required],
    reference: ['', Validators.required],
    description: [''],
    price: ['', [Validators.required, Validators.min(0)]],
    alertThreshold: [10],
    categoryId: ['', Validators.required],
    stock: [0]
  });

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getCategories(0, 1000).subscribe({
      next: (res) => {
        const categories = res.content || res || [];
        const options = categories.map((c: any) => ({
          value: c.id,
          label: c.name
        }));
        this.categoryOptions.set(options);
      }
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts(this.currentPage() - 1, this.pageSize()).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        const items = res.content || res || [];
        this.data.set(items);
        this.totalItems.set(res.totalElements || items.length);
      },
      error: () => this.notifier.error('Failed to load products')
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProducts();
  }

  openModal() {
    this.selectedProductId = null;
    this.modalTitle = 'Add Product';
    this.modalAction = 'Save Product';
    this.productForm.reset({
      alertThreshold: 10,
      stock: 0
    });
    this.showModal = true;
  }

  editProduct(product: any) {
    this.selectedProductId = product.id;
    this.modalTitle = 'Edit Product';
    this.modalAction = 'Update Product';
    
    // Find category ID by name if needed
    let catId = product.categoryId;
    if (!catId && product.category) {
      const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
      const found = this.categoryOptions().find(o => o.label === categoryName);
      catId = found ? found.value : '';
    }

    this.productForm.patchValue({
      name: product.name,
      reference: product.reference,
      description: product.description,
      price: product.price,
      alertThreshold: product.alertThreshold || 10,
      categoryId: catId,
      stock: product.stock || 0
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
