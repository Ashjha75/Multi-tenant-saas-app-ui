import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Download, Eye, Edit, Trash2, Image as ImageIcon } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

interface ProductData {
  id: string;
  image: string;
  name: string;
  reference: string;
  price: string;
  category: string;
  stock: number;
  status: 'active' | 'low' | 'out';
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Button, Input, Select, DataTable, StatusBadge],
  templateUrl: './products.html'
})
export class Products {
  private readonly fb = inject(FormBuilder);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly ImageIcon = ImageIcon;

  showModal = false;

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

  data: ProductData[] = [
    { id: '1', image: '', name: 'Dell XPS 15', reference: 'REF-001', price: '$1,299.00', category: 'Electronics', stock: 45, status: 'active' },
    { id: '2', image: '', name: 'Logitech MX Master 3', reference: 'REF-092', price: '$99.00', category: 'Accessories', stock: 3, status: 'low' },
    { id: '3', image: '', name: 'Ergonomic Office Chair', reference: 'REF-114', price: '$249.00', category: 'Furniture', stock: 0, status: 'out' }
  ];

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
    name: [''],
    reference: [''],
    description: [''],
    price: [''],
    alertThreshold: [''],
    category: [''],
    image: ['']
  });

  openModal() {
    this.productForm.reset();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProduct() {
    // Save logic
    this.showModal = false;
  }
}
