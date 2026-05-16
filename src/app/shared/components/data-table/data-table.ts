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

  trackByKey(_: number, column: TableColumn): string {
    return column.key;
  }
}
