import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingStarsComponent } from '../../rating-stars/rating-stars/rating-stars.component';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, RatingStarsComponent],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  @Input() revieweeId!: string;
  @Input() reviewerId!: string;
  @Input() postId?: string;
  @Output() created = new EventEmitter<{ rating: number; comment: string }>();

  rating = 0;
  comment = '';

  submit() {
    if (this.rating <= 0) return;
    this.created.emit({ rating: this.rating, comment: this.comment });
    this.rating = 0;
    this.comment = '';
  }
}