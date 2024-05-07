import { Component, Inject } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { PedidoService } from '../../application/service/pedido.service';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';
import { Router } from '@angular/router';

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
    private readonly pedidoService: PedidoService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
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
        this.authService.actualizarTotalesCarrito();
      }, 
      (error: any) =>{
        if (error.status == 401){
          localStorage.removeItem("customer");
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }
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
          this.success("Actualizado satisfactoriamente.");
          this.__obtener_pedidoDetalle();
        }
      }, 
      (error: any) =>{
        if (error.status == 401){
          localStorage.removeItem("customer");
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
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
          this.success("Eliminardo satisfactoriamente.");
          this.__obtener_pedidoDetalle();
        }
      }, 
      (error: any) =>{
        if (error.status == 401){
          localStorage.removeItem("customer");
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }
      })      
    } 
  }  
  __on_aplicar_cupon(){
    let codigoCupon = (<HTMLInputElement>document.getElementById("txtCupon")).value
    if (codigoCupon == "FINAL"){
      this.info("Ha ganado un 10% de descuento.");
      this.total = parseFloat(Math.round(this.total * 0.9).toFixed(2));
      this.authService.actualizarTotalesCarrito();
    }else{
      this.error("No existe cupón.");
    }
  }
  ngOnInit() :void {
    this.__obtener_pedidoDetalle();
    (<HTMLInputElement>document.getElementById("txtCupon")).value = "";
  }
  success(message: string): void {
    this.toastr.success(message, "Éxito");
  }
  info(message: string): void {
    this.toastr.info(message, "Info");
  }
  error(message: string): void {
    this.toastr.error(message, "Error");
  }  
}