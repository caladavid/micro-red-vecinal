import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
// aquí el mismo nombre que importaste
    FooterComponent,
    FormsModule,
    RouterOutlet,
    
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

}
