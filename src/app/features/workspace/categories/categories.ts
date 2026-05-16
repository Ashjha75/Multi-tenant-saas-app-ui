import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, FolderPlus, Edit, Trash2, Smartphone, Monitor, Headphones, Camera, Printer, Watch, Mouse, Speaker, Download, Package } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Button, Input],
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

  showModal = false;
  isLoading = false;

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
    this.categoryForm.reset({ icon: 'Smartphone' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.notifier.error('Please fill required fields');
      return;
    }

    const payload = this.categoryForm.value;
    this.isLoading = true;

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

  deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    this.isLoading = true;
    this.categoryService.deleteCategory(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notifier.success('Category deleted');
        this.loadCategories();
      },
      error: () => this.notifier.error('Failed to delete category')
    });
  }
}
