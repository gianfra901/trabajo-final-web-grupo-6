import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/ClienteModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  private idCliente!: string;
  private nombres!: string;
  private apellidos!: string;
  private dni!: string;
  private direccion!: string;
  private correo!: string;

  constructor(private readonly http: HttpClient) { }

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

  // public setToken(token: string): void {
  //   this.token = token;
  // }
  // public getToken(): string {
  //   return this.token;
  // }

  // public setIdCliente(idCliente: string): void {
  //   this.idCliente = idCliente;
  // }
  // public getIdCliente(): string {
  //   return this.idCliente;
  // }
  
  // public setNombres(nombres: string): void {
  //   this.nombres = nombres;
  // }
  // public getNombres(): string {
  //   return this.nombres;
  // }
  
  // public setApellidos(apellidos: string): void {
  //   this.apellidos = apellidos;
  // }
  // public getApellidos(): string {
  //   return this.apellidos;
  // }

  // public setDni(dni: string): void {
  //   this.dni = dni;
  // }
  // public getDni(): string {
  //   return this.dni;
  // }    
  // public setDireccion(direccion: string): void {
  //   this.direccion = direccion;
  // }
  // public getDireccion(): string {
  //   return this.direccion;
  // }
  // public setCorreo(correo: string): void {
  //   this.correo = correo;
  // }
  // public getCorreo(): string {
  //   return this.correo;
  // }     
}
