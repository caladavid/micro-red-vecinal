import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../services/auth/auth.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-users',
  imports: [RouterLink, NgFor],
  templateUrl: './top-users.component.html',
  styleUrl: './top-users.component.css'
})
export class TopUsersComponent implements OnInit{
  private usersService = inject(UsersService);
  users: User[] = [];
  topUsers: User[] = [];
  topN = 5; // cantidad de usuarios a mostrar

  ngOnInit() {
    this.loadTopUsers();
  }

  loadTopUsers() {
    this.usersService.getAllUsers().subscribe({
      next: users => {
        // Ordenamos por reputation descendente
        this.topUsers = users
          .sort((a, b) => (b.reputation || 0) - (a.reputation || 0))
          .slice(0, this.topN);
      },
      error: err => console.error('Error cargando usuarios:', err)
    });
  }
}
