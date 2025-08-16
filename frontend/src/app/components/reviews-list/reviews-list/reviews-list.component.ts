import { Component, Input, OnInit, inject } from '@angular/core';
import { Review } from '../../../../lib/models';
import { ReputationService } from '../../../services/reputation/reputation.service';
import { RatingStarsComponent } from "../../rating-stars/rating-stars/rating-stars.component";
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  templateUrl: './reviews-list.component.html',
  imports: [RatingStarsComponent, NgFor, CommonModule]
})

export class ReviewsListComponent implements OnInit {
  @Input() userId!: string;
  @Input() reviews: Review[] = [];
  /* reviews: Review[] = []; */
  private rep = inject(ReputationService);

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.rep.listReviewsForUser(this.userId).subscribe({
      next: (reviews) => this.reviews = reviews, // <-- asignamos el array directamente
      error: (err) => console.error('Error cargando reviews', err)
    });
  }
}