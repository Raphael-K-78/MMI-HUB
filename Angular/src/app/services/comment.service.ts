import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommentData } from '../interfaces/comment-data'; // Modifier selon ton modèle
import { environment } from '../../environments/environment'; // Import du fichier d'env

interface AddCommentResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private getUrl = `${environment.apiUrl}/api/comment`; 
  private addUrl = `${environment.apiUrl}/api/add/comment`;
  private delUrl = `${environment.apiUrl}/api/delete/comment`;

  constructor(private http: HttpClient) { }

  getCommentsByEventId(commentId: number): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(`${this.getUrl}/${commentId}`);
  }

  addComment(event_id: number,content:String): Observable<AddCommentResponse> {
    const user = sessionStorage.getItem("user");

    if (!user) {
      return throwError(() => new Error("Utilisateur non trouvé dans le stockage local."));
    }

    try {
      const userjson = JSON.parse(user);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const user_id = userjson.id;
      const body = { event_id, user_id, content };

      return this.http.post<AddCommentResponse>(this.addUrl, body, { headers }).pipe(
        catchError(err => {
          console.error("Erreur lors de l'envoie :", err);
          return throwError(() => new Error("Échec de l'envoie."));
        })
      );
    } catch (error) {
      return throwError(() => new Error("Erreur de parsing JSON."));
    }
  }

  deleteComment(commentId: number): Observable<{ message: string }> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.delete<{ message: string }>(`${this.delUrl}/${commentId}`, { headers }).pipe(
        catchError(err => {
          console.error("Erreur lors de la suppression :", err);
          return throwError(() => new Error("Échec de la suppression."));
        })
      );
    } catch (error) {
      return throwError(() => new Error("Erreur interne."));
    }
  }
}
