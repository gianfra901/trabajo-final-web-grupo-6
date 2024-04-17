import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly http: HttpClient) { }

  __obtener_proyectos_json() {
    return this.http.get('/api/todos')
  }
}
