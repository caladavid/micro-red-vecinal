import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface Post {
  user: string; // El ID del usuario en tu backend es un string
  type: 'offer' | 'request';
  title: string;
  description: string;
  category?: string;
  tags: string[];
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  status: 'open' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

// Interfaz para los datos que se envían desde el formulario
export interface CreatePostPayload {
   type: 'request' | 'offer';
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  location?: { type: 'Point'; coordinates: [number, number] } | null;
}

@Component({
  selector: 'app-create-post',
  imports: [NgIf, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})

export class CreatePostComponent implements OnInit {
  postData: CreatePostPayload = {
    type: 'request',
    title: '',
    description: '',
    category: '',
    tags: []
  };

  isTypeFixed = false;
  isCollapsed = false; // Propiedad para el estado del colapso
  asuntoInvalido = false;
  mensajeInvalido = false;
  tagsInput: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const postTypeParam = this.route.snapshot.paramMap.get('type');
    if (postTypeParam === 'offer' || postTypeParam === 'request') {
      // Esta asignación es ahora válida porque el tipo de 'this.postData.type'
      // es 'offer' | 'request' (definido en la interfaz CreatePostPayload)
      // y el tipo de 'postTypeParam' ha sido refinado a 'offer' | 'request'
      this.postData.type = postTypeParam;
      this.isTypeFixed = true;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
    this.asuntoInvalido = !this.postData.title.trim();
    this.mensajeInvalido = !this.postData.description.trim();

    if (this.asuntoInvalido || this.mensajeInvalido) {
      console.error('Título y descripción son requeridos.');
      return;
    }

    if (this.tagsInput) {
      this.postData.tags = this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    } else {
      this.postData.tags = [];
    }

    this.postService.createPost(this.postData).subscribe({
      next: (response) => {
        console.log('Post creado exitosamente:', response);
        // Limpiar formulario y resetear validaciones
        this.postData = { type: 'request', title: '', description: '', category: '', tags: [] };
        this.tagsInput = '';
        this.asuntoInvalido = false;
        this.mensajeInvalido = false;

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al crear post:', error);
      }
    });
  }
}
