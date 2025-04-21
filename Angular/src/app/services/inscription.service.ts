import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { InscriptionData } from '../interfaces/inscription-data';
import { environment } from '../../environments/environment'; // Import du fichier d'env

interface AddInscriptionResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private getUrl = `${environment.apiUrl}/api/inscriptions`;
  private addUrl = `${environment.apiUrl}/api/add/inscription`;
  private delUrl = `${environment.apiUrl}/api/delete/inscription`;

  constructor(private http: HttpClient) { }

  getAllUserInscriptions(userId: number): Observable<InscriptionData[]> {
    const filter = `?userId=${userId}`;
    return this.http.get<InscriptionData[]>(this.getUrl + filter);
  }

  getUserEventInscription(eventId?: number, userId?: number): Observable<InscriptionData[]> {
    let filter = "";

    if (eventId) {
      filter += `?eventId=${eventId}`;
    }
    if (userId) {
      filter += filter ? `&userId=${userId}` : `?userId=${userId}`;
    }

    return this.http.get<InscriptionData[]>(this.getUrl + filter);
  }

  getAllEventInscriptions(eventId: number): Observable<InscriptionData[]> {
    const filter = `?eventId=${eventId}`;
    return this.http.get<InscriptionData[]>(this.getUrl + filter);
  }

  addInscription(id_event: number): Observable<AddInscriptionResponse> {
    const user = sessionStorage.getItem("user");

    if (!user) {
      return throwError(() => new Error("Utilisateur non trouvé dans le stockage local."));
    }

    try {
      const userjson = JSON.parse(user);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const id_user = userjson.id;
      const body = { id_event, id_user };

      return this.http.post<AddInscriptionResponse>(this.addUrl, body, { headers }).pipe(
        catchError(err => {
          console.error("Erreur lors de l'inscription :", err);
          return throwError(() => new Error("Échec de l'inscription."));
        })
      );
    } catch (error) {
      return throwError(() => new Error("Erreur de parsing JSON."));
    }
  }

  deleteInscription(inscriptionId: number): Observable<{ message: string }> {
    const user = sessionStorage.getItem("user");

    if (!user) {
      return throwError(() => new Error("Utilisateur non connecté."));
    }

    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.delete<{ message: string }>(`${this.delUrl}/${inscriptionId}`, { headers }).pipe(
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
