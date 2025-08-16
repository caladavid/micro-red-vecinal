import { Component } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { CategoriesSectionComponent } from '../../shared/categories-section/categories-section.component';
import { FeedSectionComponent } from '../../shared/feed-section/feed-section.component';
import { MapCardComponent } from '../../shared/map/map.component';
import { TopUsersComponent } from "../top-users/top-users/top-users.component";

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    CategoriesSectionComponent,
    FeedSectionComponent,
    MapCardComponent,
    TopUsersComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  openOfrecer() { console.log('Abrir popup: Ofrecer ayuda'); }
  openSolicitar() { console.log('Abrir popup: Solicitar ayuda'); }

}
