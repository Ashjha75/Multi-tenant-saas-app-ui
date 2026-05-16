import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, FolderPlus, Edit, Trash2, Smartphone, Monitor, Headphones, Camera, Printer, Watch, Mouse, Speaker, Download, Package } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Input, ConfirmDialog],
  templateUrl: './categories.html'
})
export class Categories implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly notifier = inject(NotificationService);

  readonly FolderPlus = FolderPlus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Download = Download;
  readonly Package = Package;
  readonly Smartphone = Smartphone;
  readonly Monitor = Monitor;
  readonly Headphones = Headphones;
  readonly Camera = Camera;
  readonly Printer = Printer;
  readonly Watch = Watch;
  readonly Mouse = Mouse;
  readonly Speaker = Speaker;

  showModal = false;
  isLoading = false;
  selectedCategoryId: string | null = null;
  modalTitle = 'Create Category';
  modalAction = 'Save Category';

  readonly icons = [
    { name: 'Smartphone', img: Smartphone },
    { name: 'Monitor', img: Monitor },
    { name: 'Headphones', img: Headphones },
    { name: 'Camera', img: Camera },
    { name: 'Printer', img: Printer },
    { name: 'Watch', img: Watch },
    { name: 'Mouse', img: Mouse },
    { name: 'Speaker', img: Speaker }
  ];

  categories: any[] = [];

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    icon: ['Smartphone']
  });

  ngOnInit() {
    this.loadCategories();
  }

  getIcon(iconName: string) {
    const icon = this.icons.find(i => i.name === iconName);
    return icon ? icon.img : Package;
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.categories = res.content || res || [];
      },
      error: () => this.notifier.error('Failed to load categories')
    });
  }

  openModal() {
    this.selectedCategoryId = null;
    this.modalTitle = 'Create Category';
    this.modalAction = 'Save Category';
    this.categoryForm.reset({ icon: 'Smartphone' });
    this.showModal = true;
  }

  editCategory(category: any) {
    this.selectedCategoryId = category.id;
    this.modalTitle = 'Edit Category';
    this.modalAction = 'Update Category';
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      icon: category.icon || 'Smartphone'
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCategoryId = null;
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.notifier.error('Please fill required fields');
      return;
    }

    const payload = this.categoryForm.value;
    this.isLoading = true;

    if (this.selectedCategoryId) {
      this.categoryService.updateCategory(this.selectedCategoryId, payload).pipe(
        finalize(() => {
          this.isLoading = false;
          this.closeModal();
        })
      ).subscribe({
        next: () => {
          this.notifier.success('Category updated successfully');
          this.loadCategories();
        },
        error: () => this.notifier.error('Failed to update category')
      });
    } else {
      this.categoryService.createCategory(payload).pipe(
        finalize(() => {
          this.isLoading = false;
          this.closeModal();
        })
      ).subscribe({
        next: () => {
          this.notifier.success('Category created successfully');
          this.loadCategories();
        },
        error: () => this.notifier.error('Failed to create category')
      });
    }
  }

  showConfirmDialog = false;
  categoryToDelete: string | null = null;

  deleteCategory(id: string) {
    this.categoryToDelete = id;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (!this.categoryToDelete) return;
    this.showConfirmDialog = false;
    this.isLoading = true;
    this.categoryService.deleteCategory(this.categoryToDelete).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Category deleted');
        this.categoryToDelete = null;
        this.loadCategories();
      },
      error: () => {
        this.notifier.error('Failed to delete category');
        this.categoryToDelete = null;
      }
    });
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.categoryToDelete = null;
  }
}
