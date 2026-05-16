import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Boxes, ChartColumn, Shield, Users } from 'lucide-angular';
import { Card } from '../../../shared/components/card/card';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-features',
  imports: [CommonModule, LucideAngularModule, PageHeader, Card],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  readonly Shield = Shield;
  readonly Boxes = Boxes;
  readonly Users = Users;
  readonly ChartColumn = ChartColumn;
}
