import { Component, input, output } from '@angular/core';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  readonly label = input('');
  readonly id = input('');
  readonly value = input('');
  readonly options = input<SelectOption[]>([]);

  readonly valueChange = output<string>();

  onChange(event: Event): void {
    this.valueChange.emit((event.target as HTMLSelectElement).value);
  }
}
