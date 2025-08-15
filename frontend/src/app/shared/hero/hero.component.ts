import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Output() ofrecer = new EventEmitter<void>();
  @Output() solicitar = new EventEmitter<void>();
}
