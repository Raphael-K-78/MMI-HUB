import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { EventData } from '../interfaces/event-data';
import { environment } from '../../environments/environment'; // Import du fichier d'env

interface AddEventResponse {
  token: string;
}

interface ModifEventResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private getUrl = `${environment.apiUrl}/api/event`;
  private addUrl = `${environment.apiUrl}/api/add/event`;
  private modifUrl = `${environment.apiUrl}/api/modif/event`;
  private delUrl = `${environment.apiUrl}/api/delete/event`;

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(this.getUrl);
  }

  getUpcomingEvents(): Observable<EventData[]>{
    let user = sessionStorage.getItem("user");
    let filter = "?date=1";
    if (user){
      const userjson = JSON.parse(user);
      if(userjson.id){
        filter += `&user=${userjson.id}`;
      }
    }
    return this.http.get<EventData[]>(this.getUrl+filter);
  }

  getEventById(id : number): Observable<EventData> | undefined{
    //const findBy = "?id_event=" + id;
    const findBy = '/' + id;
    return this.http.get<EventData>(this.getUrl + findBy);
  }

  addEvent(nom: string, id_univ: number, img: string, content: string, date: string): Observable<AddEventResponse> {
    const user = sessionStorage.getItem("user");

    if (!user) {
      return throwError(() => new Error("Utilisateur non trouvé dans le stockage local."));
    }

    try {
      const userjson = JSON.parse(user);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const id_user = userjson.id;
      const body = { id_user, nom, id_univ, img, content, date };

      //console.log(body);

      return this.http.post<AddEventResponse>(this.addUrl, body, { headers }).pipe(
        catchError(err => {
          console.error("Erreur lors de l'envoi :", err);
          return throwError(() => new Error("Échec de l'envoi."));
        })
      );
    } catch (error) {
      return throwError(() => new Error("Erreur de parsing JSON."));
    }
  }

  deleteEvent(eventId: number): Observable<{ message: string }> {
    const user = sessionStorage.getItem("user");

    if (!user) {
      return throwError(() => new Error("Utilisateur non connecté."));
    }

    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.delete<{ message: string }>(`${this.delUrl}/${eventId}`, { headers }).pipe(
        catchError(err => {
          console.error("Erreur lors de la suppression :", err);
          return throwError(() => new Error("Échec de la suppression."));
        })
      );
    } catch (error) {
      return throwError(() => new Error("Erreur interne."));
    }
  }

  modifEvent(eventId: number, nom: string, date: string, content: string, img: string): Observable<{ message: string}> {
    const url = this.modifUrl + '/' + eventId;

    try{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { nom, date, content, img };

      return this.http.put<{ message: string }>(url, body, { headers }).pipe(
        catchError(err => {
          console.error("Erreur lors de la modification :", err);
          return throwError(() => new Error("Échec de la modification."));
        })
      );
    }
    catch (error) {
      return throwError(() => new Error("Erreur interne."));
    }
  } 
}
