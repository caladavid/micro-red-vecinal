import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api/posts';

  constructor(private http: HttpClient) { }

  // Función para crear un nuevo post
  createPost(postData: { type: string; title: string; description: string; category?: string; tags?: string[] }): Observable<any> {
    const token = localStorage.getItem('token'); // O donde sea que guardes tu token JWT

    if (!token) {
      // Manejar el caso donde no hay token (usuario no autenticado)
      console.error('No hay token de autenticación disponible.');
      // Podrías lanzar un error, redirigir al login, etc.
      throw new Error('Usuario no autenticado');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Incluir el token en el header de autorización
    });

    // Tu backend espera 'type', 'title', 'description', etc.
    // 'asunto' del frontend se mapea a 'title' del backend.
    // 'mensaje' del frontend se mapea a 'description' del backend.
    // 'user' y 'status' son manejados por el backend.
    const payload = {
      type: postData.type, // 'offer' o 'request'. Podrías hacerlo configurable en el frontend.
      title: postData.title,
      description: postData.description,
      category: postData.category,
      tags: postData.tags,
      // location y status se pueden manejar en el backend o enviar si los necesitas.
    };

    return this.http.post(this.apiUrl, payload, { headers });
  }

  // Puedes añadir más funciones para getPosts, getPostById, updatePost, deletePost
  // Por ejemplo:
  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
