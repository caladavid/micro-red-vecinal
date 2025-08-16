import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  template: `
  <div class="flex items-center gap-1">
    <button
      *ngFor="let s of stars; let i = index"
      type="button"
      (click)="rate(i+1)"
      class="w-6 h-6"
      [attr.aria-label]="'rate ' + (i+1)"
      [ngClass]="i < value ? 'text-yellow-400' : 'text-white/30'">
      ★
    </button>
    <span class="ml-2 text-sm text-white/60" *ngIf="showValue">{{ value }}/5</span>
  </div>
  `,
})
export class RatingStarsComponent {
  @Input() value = 0;
  @Input() readonly = false;
  @Input() showValue = true;
  @Output() valueChange = new EventEmitter<number>();
  stars = Array.from({ length: 5 });

  rate(v: number) {
    if (this.readonly) return;
    this.value = v;
    this.valueChange.emit(v);
  }
}
