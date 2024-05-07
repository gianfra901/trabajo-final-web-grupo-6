import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './application/service/auth.service';
import { Router } from '@angular/router';
import { PedidoService } from './application/service/pedido.service';
import { TOASTR_TOKEN, Toastr } from './application/service/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  total: number = 0;
  cantidad: number = 0;

  title = 'tiendaverde';
  usuario: string = "";
  totalCarrito = this.authService.numeroCarrito$;
  totalCantidad = this.authService.numeroCantidad$;
  
  constructor(
    private readonly authService: AuthService,
    private readonly pedidoService: PedidoService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private router: Router) {}  

  ngOnInit() :void {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
      {
      this.usuario = usuarioLS.nombres;
    }
    this.__refrescarTotales();
    
  }  
  onActivate(event: any) {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
  }
  __on_cerrar_sesion() {
    localStorage.removeItem("customer");
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
  __on_validar_carntidad_carrito(){
    
    if (this.cantidad == 0){
      this.info("Tu carrito está vacío.");
    }else{
      this.router.navigate(['/shop-cart']);
    }
  }
  __refrescarTotales(){
    this.total = 0;
    this.cantidad = 0;
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null){
      this.pedidoService.__obtener_pedido(usuarioLS.token, usuarioLS.idPedido).subscribe((rest: any) => {
        rest.forEach((x: any) => {
          this.total = this.total+ x.total;
          this.cantidad = this.cantidad + x.cantidad;
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
        }); 
    }    
  }
  info(message: string): void {
    this.toastr.info(message, "Info");
  } 
}
