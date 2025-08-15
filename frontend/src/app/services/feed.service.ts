import { Injectable, signal, computed } from '@angular/core';
import { PostItem, CategoryKey } from '../models';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private _all = signal<PostItem[]>([
    {
      id: '1',
      author: { name: 'Marco Pérez', avatar: 'assets/avatars/a1.png' },
      title: 'Ayuda con las plantas',
      excerpt: '¿Alguien podría regar mis plantas este fin de semana?',
      category: 'jardineria',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      author: { name: 'Laura Rivas', avatar: 'assets/avatars/a2.png' },
      title: 'Reparación de grifo',
      excerpt: 'Necesito ayuda para arreglar un grifo que gotea.',
      category: 'reparaciones',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      author: { name: 'Sofía Méndez', avatar: 'assets/avatars/a3.png' },
      title: 'Clases de matemáticas',
      excerpt: 'Ofrezco clases los sábados por la mañana.',
      category: 'clases',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      author: { name: 'Diego Torres', avatar: 'assets/avatars/a4.png' },
      title: 'Paseo de mascotas',
      excerpt: 'Puedo pasear a tu perrito por las tardes.',
      category: 'mascotas',
      createdAt: new Date().toISOString()
    }
  ]);

  query = signal('');
  activeCategory = signal<CategoryKey | 'all'>('all');

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const cat = this.activeCategory();
    return this._all()
      .filter(p => (cat === 'all' ? true : p.category === cat))
      .filter(p => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q)
        );
      });
  });

  setQuery(q: string) { this.query.set(q); }
  setCategory(cat: CategoryKey | 'all') { this.activeCategory.set(cat); }
}
