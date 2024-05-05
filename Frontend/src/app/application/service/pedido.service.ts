import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private readonly http: HttpClient) { }

  __registrar_pedido(bearer: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + bearer);
    return this.http.get('https://localhost:7027/api/Pedido', {headers})
  }
}
