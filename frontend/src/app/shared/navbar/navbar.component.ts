import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule]
})
export class NavbarComponent {
  searchTerm: string = '';
  public user: User | null = null; // Hacerlo público para que sea accesible en el template
  public isAuthenticated: boolean = false; // Estado de autenticación para el template
  private subscriptions: Subscription[] = [];

  onSearch(value: string) {
    this.searchTerm = value;
    console.log('Buscando:', value);
  }

  constructor(public authService: AuthService) { }

  ngOnInit() {
    // Suscribirse al Observable de currentUser para actualizar el estado reactivamente
    this.subscriptions.push(
      this.authService.currentUser.subscribe(u => {
        this.user = u;
        this.isAuthenticated = !!u; // `!!u` convierte `null` a `false` y un objeto a `true`
        console.log('Usuario actual en Navbar (reactivo):', this.user);
      })
    );
  }

  // Importante: Desuscribirse para evitar fugas de memoria
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
