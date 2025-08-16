import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
/* import { environment } from '../../../environments/environment'; */
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Skill } from '../../../lib/models';

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  role?: string;
  token?: string;
  reputation?: number;
  skills: Skill[];
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* private readonly API_URL = `/api/auth`; */
  private readonly API_URL = `/api/auth`;
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'currentUser'
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let user: User | null = null;
    if (this.isBrowser) { // <-- Use the flag before accessing localStorage
      const storedUser = localStorage.getItem(this.USER_KEY);
      if (storedUser !== null && storedUser !== 'undefined') {
        try {
          user = JSON.parse(storedUser);
        } catch (error) {
          console.error('Error al parsear el usuario del localStorage:', error);
        }
      }
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();

  }

  saveToken(token: string, user: User): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }


  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) { // <-- Comprobación de la plataforma
      return !!this.getToken();
    }
    return false;
  }

  private resetAuthState(): void {
    this.currentUserSubject.next(null);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 'Error desconocido';
    return throwError(() => new Error(errorMessage));
  }


  // Método adicional para determinar si el usuario es administrador
  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data).pipe(
      catchError(this.handleAuthError)
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials, {
      withCredentials: true // ← Envía cookies automáticamente
    }).pipe(
      tap((response) => {
        console.log('Respuesta del servidor en login:', response)
        this.saveToken(response.token, response);
        if (response.token) {
          this.currentUserSubject.next(response);
        }
        this.router.navigateByUrl('/home');
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error(error.error?.message || 'Login failed'));
      })
    );
  }


  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.resetAuthState();
    this.router.navigateByUrl('/login');
  }
  /*   logout() {
      localStorage.removeItem(this.TOKEN_KEY);
      this.userRole.next(null);
      this.router.navigateByUrl('/login');
    } */
}
