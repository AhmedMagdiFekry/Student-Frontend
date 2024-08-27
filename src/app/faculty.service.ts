import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faculty } from './faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.apiServerUrl}/api/faculties`);
  }
}
