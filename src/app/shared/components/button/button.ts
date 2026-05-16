import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly block = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly customClass = input('');

  readonly clicked = output<Event>();

  readonly buttonClass = computed(() => {
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primaryHover hover:scale-[1.02] active:scale-[0.98]',
      secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
      danger: 'bg-danger text-white shadow-lg shadow-danger/20 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6 text-sm',
      lg: 'h-14 px-7 text-base',
    };

    return clsx(
      'inline-flex items-center justify-center rounded-button font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
      variantClasses[this.variant()],
      sizeClasses[this.size()],
      this.block() ? 'w-full' : '',
      this.customClass(),
    );
  });

  onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
