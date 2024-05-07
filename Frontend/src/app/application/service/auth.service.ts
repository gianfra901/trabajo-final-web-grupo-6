import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel, RegistrarClienteModel } from '../models/ClienteModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { PedidoService } from './pedido.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  total: number = 0;
  cantidad: number = 0;  
  private totalCarrito = new BehaviorSubject<number>(0);
  private totalCantidad = new BehaviorSubject<number>(0);
  
  constructor(private readonly http: HttpClient, private readonly pedidoService: PedidoService, private router: Router) {}

  get numeroCarrito$() {
    return this.totalCarrito.asObservable();
  }
  get numeroCantidad$() {
    return this.totalCantidad.asObservable();
  }
  actualizarTotalesCarrito() {
    this.total = 0;
    this.cantidad = 0;
    let usuarioLS = this.getUsuarioFromSession();
    if (usuarioLS != null){
      this.pedidoService.__obtener_pedido(usuarioLS.token, usuarioLS.idPedido).subscribe((rest: any) => {
        rest.forEach((x: any) => {
          this.total = this.total+ x.total;
          this.cantidad = this.cantidad + x.cantidad;
        });
        this.totalCantidad.next(this.cantidad);
        this.totalCarrito.next(this.total);
        }, 
        (error: any) =>{
          if (error.status == 401){
            localStorage.removeItem("customer");
            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });
          }
        }); 
    } 

  }
  __obtener_tokenauth_json(correo: string, contrasena: string) {
    // return this.http.get('https://wappupcapi.azurewebsites.net/api/Token')
    return this.http.get(`${environment.apiUrlIS}/Token?correo=${correo}&contrasena=${contrasena}`)
  }
  __registrar_cliente_json(cliente: RegistrarClienteModel) {
    return this.http.post(`${environment.apiUrlIS}/Token`, cliente)
  }  
  public getUsuarioFromSession(): ClienteModel {
    let ls = localStorage.getItem("customer");
    if (ls != null){
      var data: ClienteModel | any = JSON.parse(ls);
      return data
    }
    return data;
  }

  public updateUsuarioPedido(idPedido: string) {
    let ls = localStorage.getItem("customer");
    if (ls != null){
      var data: ClienteModel | any = JSON.parse(ls);
      data.idPedido = idPedido;
      localStorage.setItem("customer", JSON.stringify(data));
    }
  }
}
