import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, CategoryKey } from '../../models';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './categories-section.component.html'
})
export class CategoriesSectionComponent {
  private feed = inject(FeedService);

  categories: Category[] = [
    { key: 'jardineria',   name: 'Jardinería',          icon: 'assets/icons/planta.png' },
    { key: 'reparaciones', name: 'Reparaciones',        icon: 'assets/icons/martillo.png' },
    { key: 'clases',       name: 'Clases',              icon: 'assets/icons/libro.png' },
    { key: 'mascotas',     name: 'Cuidado de Mascotas', icon: 'assets/icons/paticas.png' }
  ];

  select(cat: CategoryKey) { this.feed.setCategory(cat); }
  isActive(cat: CategoryKey) { return this.feed.activeCategory() === cat; }
}
