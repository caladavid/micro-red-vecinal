import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingStarsComponent } from '../../rating-stars/rating-stars/rating-stars.component';
import { ReputationService } from '../../../services/reputation/reputation.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, RatingStarsComponent],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  @Input() revieweeId!: string;
  @Input() reviewerId!: string;
  @Output() created = new EventEmitter<{ rating: number; comment: string }>();

  private rep = inject(ReputationService);

  rating = 0;
  comment = '';

  submit() {
    if (this.rating <= 0) return;

    this.rep.createReview({
      reviewee: this.revieweeId,
      rating: this.rating,
      comment: this.comment
    }).subscribe({
      next: () => {
        this.rating = 0;
        this.comment = '';
        this.created.emit();
      },
      error: err => console.error('Error creando review:', err)
    });
  }

}