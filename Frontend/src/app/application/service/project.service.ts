import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly http: HttpClient) { }

  __obtener_proyectos_json() {
    return this.http.get('/api/todos')
  }
  __obtener_productos_json(bearer: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + bearer);
    return this.http.get('https://localhost:7027/api/Producto', {headers})
  }
}
