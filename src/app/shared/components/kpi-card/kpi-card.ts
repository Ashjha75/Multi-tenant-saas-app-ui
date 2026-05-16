import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class KpiCard {
  readonly label = input('Metric');
  readonly value = input('0');
  readonly change = input('0%');
  readonly trend = input<'up' | 'down' | 'neutral'>('neutral');
}
