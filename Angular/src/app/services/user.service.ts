import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserData } from '../interfaces/user-data'; // Modifier selon ton modèle
import { environment } from '../../environments/environment'; // Import du fichier d'env

interface AddUserResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUrl = `${environment.apiUrl}/api/user`;
  private addUrl = `${environment.apiUrl}/api/add/user`;
  private delUrl = `${environment.apiUrl}/api/delete/user`;

  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.getUrl);
  }

  getUserById(userId: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.getUrl}/${userId}`);
  }

  addUser(nom: string, prenom: string, 
    mail: string, pwd: string, roles: string[])
    : Observable<AddUserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { nom, prenom, mail, pwd, roles};

    return this.http.post<AddUserResponse>(this.addUrl, body, { headers });
  }

  deleteUser(userId: number): Observable<{ message: string }> {
      const user = sessionStorage.getItem("user");
  
      if (!user) {
        return throwError(() => new Error("Utilisateur non connecté."));
      }
  
      try {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
        return this.http.delete<{ message: string }>(`${this.delUrl}/${userId}`, { headers }).pipe(
          catchError(err => {
            console.error("Erreur lors de la suppression :", err);
            return throwError(() => new Error("Échec de la suppression."));
          })
        );
      } catch (error) {
        return throwError(() => new Error("Erreur interne."));
      }
  }

  modifUser(): void {
    // TODO : à implémenter
    console.log("Modif user non implémenté");
  }
}
