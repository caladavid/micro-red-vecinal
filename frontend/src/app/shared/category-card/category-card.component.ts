import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input() data!: Category;
  @Input() active = false;
}
