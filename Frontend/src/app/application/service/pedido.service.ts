import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoModel } from '../models/PedidoModel';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private readonly http: HttpClient) { }


  __eliminar_pedido(bearer: string, idPedido: string, idProducto: string) {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + bearer)
    .set('Content-Type','application/json');

    let resp = this.http.delete<any>(`https://localhost:7027/api/Pedido?idpedido=${idPedido}&idproducto=${idProducto}`, {headers})
    return resp;
  }

  __actualizar_pedido(bearer: string, idPedido: string, idProducto: string, cantidad: number) {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + bearer)
    .set('Content-Type','application/json');
    let body = JSON.stringify({
      idPedido: idPedido,
      idProducto: idProducto,
      cantidad: cantidad
    }) ;

    let resp = this.http.put<any>('https://localhost:7027/api/Pedido', body , {headers})
    return resp;
  }

  __actualizarEstado_pedido(bearer: string, idPedido: string, realizado: boolean) {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + bearer)
    .set('Content-Type','application/json');
    let body = JSON.stringify({
      idPedido: idPedido,
      realizado: realizado
    }) ;

    let resp = this.http.patch<any>('https://localhost:7027/api/Pedido', body , {headers})
    return resp;
  }


  __registrar_pedido(bearer: string, pedido: PedidoModel) {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + bearer)
    .set('Content-Type','application/json');

    let resp = this.http.post<any>('https://localhost:7027/api/Pedido', pedido , {headers})
    return resp;
  }
  __obtener_pedido(bearer: string, pedido: string) {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + bearer)
    .set('Content-Type','application/json');

    let resp = this.http.get(`https://localhost:7027/api/Pedido?pedido=${pedido}`, {headers})
    return resp;
  }
}

// {
//   idPedido: "",
//   idCliente:  "",
//   totalVenta: 0,
//   realizado: 1,
//   idProducto: "P001",
//   cantidad: 1,
//   precio: 45
// } 
