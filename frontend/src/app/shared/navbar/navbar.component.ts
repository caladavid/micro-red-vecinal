import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchTerm: string = '';

  onSearch(value: string) {
    this.searchTerm = value;
    console.log('Buscando:', value);
  }
}
