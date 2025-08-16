import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private API_URL = '/api/users';

  // Obtiene todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<{ message: string, users: User[] }>(this.API_URL)
      .pipe(map(res => res.users));
  }
}