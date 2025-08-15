import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './shared/hero/hero.component';
import { CategoriesSectionComponent } from './shared/categories-section/categories-section.component';
import { FeedSectionComponent } from './shared/feed-section/feed-section.component';
import { MapCardComponent } from './shared/map/map.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    CategoriesSectionComponent,
    FeedSectionComponent,
    MapCardComponent, // aquí el mismo nombre que importaste
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  openOfrecer() { console.log('Abrir popup: Ofrecer ayuda'); }
  openSolicitar() { console.log('Abrir popup: Solicitar ayuda'); }
}
