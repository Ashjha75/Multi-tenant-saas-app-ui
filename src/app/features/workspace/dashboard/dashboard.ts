import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, PackagePlus, FolderPlus, ArrowDownCircle, Package, Boxes, ArrowDown, ArrowUp, TriangleAlert, Activity, ChevronRight } from 'lucide-angular';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Button],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  readonly PackagePlus = PackagePlus;
  readonly FolderPlus = FolderPlus;
  readonly ArrowDownCircle = ArrowDownCircle;
  readonly Package = Package;
  readonly Boxes = Boxes;
  readonly ArrowDown = ArrowDown;
  readonly ArrowUp = ArrowUp;
  readonly TriangleAlert = TriangleAlert;
  readonly Activity = Activity;
  readonly ChevronRight = ChevronRight;
}
