export type CategoryKey = 'jardineria' | 'reparaciones' | 'clases' | 'mascotas';

export interface Category {
  key: CategoryKey;
  name: string;
  icon: string; // ruta en assets, p.e. 'assets/icons/planta.png'
}

export interface PostItem {
  id: string;
  author: { name: string; avatar?: string };
  title: string;
  excerpt: string;
  category: CategoryKey;
  createdAt: string | Date;
}
