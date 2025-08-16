// Tipos que ya tenías definidos
export type CategoryKey = 'jardineria' | 'reparaciones' | 'clases' | 'mascotas';

export interface Category {
  key: CategoryKey;
  name: string;
  icon: string; 
}

// --- AÑADE ESTA INTERFAZ ---
// Esta era la definición que te faltaba en el archivo.
export interface PostItem {
  id: string;
  author: { name: string; avatar?: string };
  title: string;
  excerpt: string;
  category: CategoryKey;
  createdAt: string | Date;
}
// -----------------------------

// --- Constante con los datos actualizados de tus categorías ---
export const CATEGORIES: Category[] = [
  {
    key: 'jardineria',
    name: 'Jardinería',
    icon: '/assets/icons/planta.png',
  },
  {
    key: 'reparaciones',
    name: 'Reparaciones',
    icon: '/assets/icons/martillo.png',
  },
  {
    key: 'clases',
    name: 'Clases',
    icon: '/assets/icons/libro.png',
  },
  {
    key: 'mascotas',
    name: 'Mascotas',
    icon: '/assets/icons/paticas.png',
  },
];