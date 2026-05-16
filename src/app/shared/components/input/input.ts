import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  readonly label = input('');
  readonly id = input('');
  readonly type = input('text');
  readonly placeholder = input('');
  readonly value = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly required = input(false);
  readonly disabled = input(false);

  readonly valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
