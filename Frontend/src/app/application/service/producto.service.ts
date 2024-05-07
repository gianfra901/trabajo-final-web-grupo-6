import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  __obtener_productos_json() {
    // let headers = new HttpHeaders().set('Authorization', 'Bearer ' + bearer);
    return this.http.get(`${environment.apiUrl}/Producto`)
  }
  __obtener_producto_detalle_json(idProducto: string) {
    // let headers = new HttpHeaders().set('Authorization', 'Bearer ' + bearer);
    return this.http.get(`${environment.apiUrl}/Producto/${idProducto}`)
  }
  __obtener_productos_top_items_json(items: number) {
    // let headers = new HttpHeaders().set('Authorization', 'Bearer ' + bearer);
    return this.http.get(`${environment.apiUrl}/Producto/items/${items}`)
  }
  __obtener_productos_x_categoria_json(categoria: string) {
    // let headers = new HttpHeaders().set('Authorization', 'Bearer ' + bearer);
    return this.http.get(`${environment.apiUrl}/Producto/categoria/${categoria}`)
  }      
}
