import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniversiteData } from '../interfaces/universite-data'; // Modifier selon ton modèle
import { environment } from '../../environments/environment'; // Import du fichier d'env

@Injectable({
  providedIn: 'root'
})
export class UniversitesService {
  private apiUrl = `${environment.apiUrl}/api/universites`; // L'URL de ton API

  constructor(private http: HttpClient) { }

  getAllUniversites(): Observable<UniversiteData[]> {
    return this.http.get<UniversiteData[]>(this.apiUrl);
  }
}
