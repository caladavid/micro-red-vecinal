import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reputation-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="w-full">
    <div class="flex items-center justify-between mb-1">
      <span class="text-sm text-white/80">Reputación</span>
      <span class="text-sm text-white/60">{{ value ?? 0 }}</span>
    </div>
    <div class="w-full bg-white/10 rounded-full h-2">
      <div class="h-2 rounded-full bg-emerald-500" [style.width.%]="_Math.min((value ?? 0), 100)"></div>
    </div>
  </div>
  `,
})
export class ReputationBarComponent {
  @Input() value: number | undefined = 0; // 0..100 si así lo decides
  _Math: Math = Math; 
}