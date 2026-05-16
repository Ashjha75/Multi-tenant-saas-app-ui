import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, FolderPlus, Edit, Trash2, Smartphone, Monitor, Headphones, Camera, Printer, Watch, Mouse, Speaker, Download, Package } from 'lucide-angular';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, PageHeader, Button, Input],
  templateUrl: './categories.html'
})
export class Categories {
  private readonly fb = inject(FormBuilder);

  readonly FolderPlus = FolderPlus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Download = Download;
  readonly Package = Package;

  showModal = false;

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

  categories = [
    { id: 1, name: 'Mobile Devices', description: 'Smartphones and accessories', productsCount: 145, lastUpdated: '2 hours ago', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, name: 'Computers', description: 'Laptops, desktops, monitors', productsCount: 320, lastUpdated: '1 day ago', icon: Monitor, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 3, name: 'Audio', description: 'Headphones, speakers, mics', productsCount: 89, lastUpdated: '3 days ago', icon: Headphones, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 4, name: 'Photography', description: 'Cameras and lenses', productsCount: 42, lastUpdated: '1 week ago', icon: Camera, color: 'text-orange-500', bg: 'bg-orange-50' }
  ];

  categoryForm = this.fb.group({
    name: [''],
    description: [''],
    icon: ['Smartphone']
  });

  openModal() {
    this.categoryForm.reset({ icon: 'Smartphone' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCategory() {
    this.showModal = false;
  }
}
