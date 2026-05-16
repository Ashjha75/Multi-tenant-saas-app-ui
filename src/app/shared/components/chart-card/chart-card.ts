import { Component, input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-chart-card',
  imports: [NgApexchartsModule],
  templateUrl: './chart-card.html',
  styleUrl: './chart-card.css',
})
export class ChartCard {
  readonly title = input('Chart');
  readonly series = input<ApexAxisChartSeries>([]);
  readonly chart = input<ApexChart>({ type: 'line', height: 300, toolbar: { show: false } });
  readonly xaxis = input<ApexXAxis>({ categories: [] });
  readonly yaxis = input<ApexYAxis>({});
  readonly stroke = input<ApexStroke>({ curve: 'smooth', width: 3 });
  readonly legend = input<ApexLegend>({ show: false });
  readonly dataLabels = input<ApexDataLabels>({ enabled: false });
}
