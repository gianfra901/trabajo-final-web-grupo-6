import { Component } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { PedidoService } from '../../application/service/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-cart-checkout',
  templateUrl: './shop-cart-checkout.component.html',
  styleUrl: './shop-cart-checkout.component.css'
})
export class ShopCartCheckoutComponent {
  detallePedido : any = []  
  total: number = 0;
  cantidad: number = 0;

  nombres: string = "";
  apellidos: string = "";
  direccion: string = "";
  dni: string = "";
  correo: string = "";

  constructor(private readonly authService: AuthService, private readonly pedidoService: PedidoService, private router: Router) {}
  ngOnInit() :void {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.nombres = usuarioLS.nombres;
      this.apellidos = usuarioLS.apellidos;
      this.direccion = usuarioLS.direccion;
      this.dni = usuarioLS.dni;
      this.correo = usuarioLS.correo;
    }
    this.__obtener_pedidoDetalle();
  }
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

  __on_actualizarEstado_pedido() {
    this.total = 0;
    this.cantidad = 0;
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.pedidoService.__actualizarEstado_pedido(usuarioLS.token, usuarioLS.idPedido, true).subscribe((rest: any) => {
        if (rest>=1){
          this.__obtener_pedidoDetalle();
          this.authService.actualizarCantidad(0);
          this.authService.actualizarNumero(0);

          alert("Pedido completado satisfactoriamente.")
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });

        }
      })      
    } 
  }

}
