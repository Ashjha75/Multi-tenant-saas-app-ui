import { Component, signal } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-pricing',
  imports: [PageHeader, Button],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  readonly yearly = signal(false);
}
