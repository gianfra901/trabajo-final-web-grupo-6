export interface ClienteModel {
    idCliente: string;
    nombres: string;
    apellidos: string;
    dni: string;
    direccion: string;
    correo: string;
    telefono: string;
    idPedido: string;
    token: string;
  }

  export class RegistrarClienteModel {
    nombres: string;
    apellidos: string;
    dni: string;
    direccion: string;
    correo: string;
    telefono: string;
    contrasena: string;

    constructor(nombres: string, apellidos: string, dni: string, direccion: string, correo: string, telefono: string, contrasena: string ) {
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.dni = dni;
      this.direccion = direccion;
      this.correo = correo;
      this.telefono = telefono;
      this.contrasena = contrasena;
  }

  }  