import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from '../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://angular-test042023.s3.eu-west-3.amazonaws.com/data-servers.json'
  constructor(private http: HttpClient) { }

  getVirtualServersList(): Observable<Server[]>
  {
    return this.http.get<Server[]>(`${this.apiUrl}`)
  }
}
