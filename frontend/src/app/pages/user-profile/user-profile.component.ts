import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReputationService } from '../../services/reputation/reputation.service';
import { ReviewFormComponent } from "../../components/review-form/review-form/review-form.component";
import { ReviewsListComponent } from "../../components/reviews-list/reviews-list/reviews-list.component";
import { SkillChipComponent } from "../../components/skill-chip/skill-chip/skill-chip.component";
import { ReputationBarComponent } from "../../components/reputation-bar/reputation-bar/reputation-bar.component";

import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../services/auth/auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  imports: [CommonModule, ReviewFormComponent, FormsModule, ReviewsListComponent, SkillChipComponent, ReputationBarComponent]
})
export class UserProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  public rep = inject(ReputationService);
  private apiUrl = '/api';

  userId!: string;
  user?: User;
  isAdmin = false; // simula rol de admin

  newSkillName = '';
  newSkillLevel?: number;

  rating = 0;
  comment = '';

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log('UserProfileComponent: ngOnInit - userId de la URL:', this.userId); // <-- CLG 1
    this.loadUser();
  }

  loadUser() {
    this.http
      .get<{ message: string; user: User }>(`${this.apiUrl}/users/${this.userId}`)
      .pipe(
        map(res => res.user),
        catchError(err => this.handleHttpError(err))
      )
      .subscribe({
        next: (user) => {
          console.log('Usuario recibido en componente (plano):', user);
          this.user = user;
        },
        error: (err) => console.error('Error cargando usuario', err)
      });
  }


  addSkill() {
    if (!this.newSkillName) return;
    this.rep.addSkill(this.userId, { name: this.newSkillName, level: this.newSkillLevel })
      .subscribe(u => { this.user = u; this.newSkillName = ''; this.newSkillLevel = undefined; });
  }

  getUserById(userId: string): Observable<User> {
    return this.http
      .get<{ message: string; user: User }>(`${this.apiUrl}/users/${userId}`)
      .pipe(
        map(res => {
          console.log('Respuesta del backend:', res);
          return res.user; // solo devolvemos el usuario
        }),
        catchError(err => this.handleHttpError(err))
      );
  }

  handleHttpError(error: any) {
    console.error('Error HTTP:', error);
    return throwError(() => new Error(error.message || 'Error en la solicitud HTTP'));
  }



  onEndorse(skillName: string) {
    this.rep.endorseSkill(this.userId, skillName).subscribe(u => this.user = u);
  }

  onVerify(skillName: string) {
    if (!this.isAdmin) return;
    this.rep.verifySkill(this.userId, skillName).subscribe(u => this.user = u);
  }

  submitReview() {
    if (this.rating <= 0) return;
    const reviewerId = 'ME'; // reemplaza con AuthService
    this.rep.createReview({ reviewer: reviewerId, reviewee: this.userId, rating: this.rating, comment: this.comment })
      .subscribe(() => { this.rating = 0; this.comment = ''; });
  }
}