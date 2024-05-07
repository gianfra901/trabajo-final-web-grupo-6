import { Component, OnInit } from '@angular/core';
import { AuthService } from './application/service/auth.service';
import { Router } from '@angular/router';
import { PedidoService } from './application/service/pedido.service';

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
        }); 
    }    
  }
}
