import { Component } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { PedidoService } from '../../application/service/pedido.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent {
  detallePedido : any = []
  total: number = 0;
  cantidad: number = 0;
  constructor(
    private readonly authService: AuthService, 
    private readonly pedidoService: PedidoService
  ) {}  
  __obtener_pedidoDetalle() {
    this.total = 0;
    this.cantidad = 0;
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.pedidoService.__obtener_pedido(usuarioLS.token, usuarioLS.idPedido).subscribe((rest: any) => {
        this.detallePedido = rest;
        rest.forEach((x: any) => {
          this.total = this.total+ x.total;
          this.cantidad = this.cantidad + 1;
        });
        this.authService.actualizarCantidad(this.cantidad);
        this.authService.actualizarNumero(this.total);
      })      
    } 
  }
  __on_actualizar_carrito(idProducto: string){   
    let cantidad = (<HTMLInputElement>document.getElementById("txtCantidad"+idProducto)).value
  
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.pedidoService.__actualizar_pedido(usuarioLS.token, usuarioLS.idPedido, idProducto, parseFloat(cantidad)).subscribe((rest: any) => {
        if(rest>=1){
          alert("Actualizado satisfactoriamente.");
          this.__obtener_pedidoDetalle();
        }
      })      
    } 
  }

  __on_eliminar_carrito(idProducto: string){   
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.pedidoService.__eliminar_pedido(usuarioLS.token, usuarioLS.idPedido, idProducto).subscribe((rest: any) => {
        if(rest>=1){
          alert("Eliminardo satisfactoriamente.");
          this.__obtener_pedidoDetalle();
        }
      })      
    } 
  }  


  __on_aplicar_cupon(){
    let codigoCupon = (<HTMLInputElement>document.getElementById("txtCupon")).value
    if (codigoCupon == "FINAL"){
      alert("Ha ganado un 10% de descuento.");
      this.total = parseFloat(Math.round(this.total * 0.9).toFixed(2));
      this.authService.actualizarNumero(this.total);
    }else{
      alert("No existe cupón.");
    }
  }
  ngOnInit() :void {
    this.__obtener_pedidoDetalle();
    (<HTMLInputElement>document.getElementById("txtCupon")).value = "";
  }
}

// cantidad
// : 
// 2
// idPedido
// : 
// "PE05"
// idPedidoDetalle
// : 
// "11"
// idProducto
// : 
// "P003"
// precio
// : 
// 5.4
// total
// : 
// 10.8
