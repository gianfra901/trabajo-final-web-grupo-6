export class PedidoModel {
    idPedido: string;
    idCliente: string;
    totalVenta: number;
    realizado: boolean;
    idProducto: string;
    cantidad: number;
    precio: number;

    constructor(idPedido: string, idCliente: string, totalVenta: number, realizado: boolean, idProducto: string, cantidad: number, precio: number ) {
        this.idPedido = idPedido;
        this.idCliente = idCliente;
        this.totalVenta = totalVenta;
        this.realizado = realizado;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
  }