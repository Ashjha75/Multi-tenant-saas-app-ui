import { CdkTableModule } from '@angular/cdk/table';
import { Component, computed, input } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-data-table',
  imports: [CdkTableModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  readonly columns = input<TableColumn[]>([]);
  readonly rows = input<Record<string, unknown>[]>([]);

  readonly displayedColumnKeys = computed(() => this.columns().map((column) => column.key));

  isStatusColumn(key: string): boolean {
    return ['status', 'state'].includes(key.toLowerCase());
  }

  getStatusClass(value: unknown): string {
    const normalized = String(value ?? '').toLowerCase();
    if (normalized === 'active') return 'status-active';
    if (normalized === 'pending') return 'status-pending';
    if (normalized === 'blocked' || normalized === 'suspended') return 'status-blocked';
    return '';
  }
}
