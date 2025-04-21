import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import du fichier d'env
import { UserData } from '../interfaces/user-data';
import { Router } from '@angular/router';

interface LoginResponse {
  message: string;
  user: UserData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${environment.apiUrl}/api/login`;
  private userSubject: BehaviorSubject<UserData | null>;
  public user$: Observable<UserData | null>;

  constructor(private http: HttpClient, private router: Router) {
    // Initialize userSubject with the value from localStorage
    const storedUser = sessionStorage.getItem('user');
    this.userSubject = new BehaviorSubject<UserData | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.user$ = this.userSubject.asObservable();
  }

  login(mail: string, pwd: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = { mail, pwd };

    return this.http.post<LoginResponse>(this.loginUrl, body, { headers });
  }

  saveUser(user: UserData): void {
    sessionStorage.setItem('user', JSON.stringify(user)); // Persist user in localStorage
    this.userSubject.next(user); // Update the BehaviorSubject
  }

  getUser(): UserData | null {
    return this.userSubject.value;
  }

  logout(): void {
    sessionStorage.removeItem('user'); // Remove user from localStorage
    this.userSubject.next(null); // Clear the BehaviorSubject
    this.router.navigate(['/']); // Redirect to the home page
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  getUserRoles(): string[] {
    const user = this.userSubject.value;
    return user ? user.roles : [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  isUser(): boolean {
    return this.isLoggedIn() && this.hasRole('ROLE_USER');
  }

  isIntervenant(): boolean {
    return this.isLoggedIn() && (this.hasRole('ROLE_PROF') || this.hasRole('ROLE_INTERVENANT'));
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.hasRole('ROLE_ADMIN');
  }
}