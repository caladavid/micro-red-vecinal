import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { User } from '../auth/auth.service';
import { Review } from '../../../lib/models';

@Injectable({ providedIn: 'root' })
export class ReputationService {
  private http = inject(HttpClient);
  private API_BASE = 'http://localhost:8000/api';

  // ===== Users / Skills =====
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_BASE}/users/${userId}`);
  }

  addSkill(userId: string, payload: { name: string; level?: number }): Observable<User> {
    return this.http.post<User>(`${this.API_BASE}/users/${userId}/skills`, payload);
  }

  endorseSkill(revieweeId: string, skillName: string): Observable<User> {
    // el backend usualmente usa PUT/PATCH
    return this.http.post<User>(`${this.API_BASE}/users/${revieweeId}/skills/${encodeURIComponent(skillName)}/endorse`, {});
  }

  // Solo admins o regla de negocio (ej: auto-verificar con X endorsements)
  verifySkill(revieweeId: string, skillName: string): Observable<User> {
    return this.http.post<User>(`${this.API_BASE}/users/${revieweeId}/skills/${encodeURIComponent(skillName)}/verify`, {});
  }

  // ===== Reviews / Reputación =====
  listReviewsForUser(userId: string): Observable<Review[]> {
    return this.http
      .get<{ message: string; reviews: Review[] }>(`${this.API_BASE}/users/${userId}/reviews`)
      .pipe(map(res => res.reviews));
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.API_BASE}/reviews`, review);
  }

  // Si el backend expone un endpoint para reputación agregada
  getReputation(userId: string): Observable<{ reputation: number }> {
    return this.http.get<{ reputation: number }>(`${this.API_BASE}/users/${userId}/reputation`);
  }
}
