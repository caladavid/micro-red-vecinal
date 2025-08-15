import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-feed-section',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './feed-section.component.html'
})
export class FeedSectionComponent {
  feed = inject(FeedService);
}
