import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/ClienteModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private totalCarrito = new BehaviorSubject<number>(0);
  private totalCantidad = new BehaviorSubject<number>(0);
  
  constructor(private readonly http: HttpClient) {}

  get numeroCarrito$() {
    return this.totalCarrito.asObservable();
  }
  get numeroCantidad$() {
    return this.totalCantidad.asObservable();
  }
  actualizarNumero(nuevoNumero: number) {
    this.totalCarrito.next(nuevoNumero);
  }
  actualizarCantidad(nuevoNumero: number) {
    this.totalCantidad.next(nuevoNumero);
  }  

  __obtener_tokenauth_json(correo: string, contrasena: string) {
    // return this.http.get('https://wappupcapi.azurewebsites.net/api/Token')
    return this.http.get(`https://localhost:7012/api/Token?correo=${correo}&contrasena=${contrasena}`)
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
