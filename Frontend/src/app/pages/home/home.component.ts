import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProjectService } from '../../application/service/project.service';
import { AuthService } from '../../application/service/auth.service';
import { PedidoService } from '../../application/service/pedido.service';
import { PedidoModel } from '../../application/models/PedidoModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  total: number = 0;
  cantidad: number = 0;

  constructor(
    private readonly ps: ProjectService, 
    private readonly authService: AuthService, 
    private readonly pedidoService: PedidoService
    // private pedidoModel: PedidoModel
  ) {}  
  products : any = []
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  __on_agregar_carrito(idProducto: string, precio: number) {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      let pedido = new PedidoModel(usuarioLS.idPedido, usuarioLS.idCliente, 100, false, idProducto, 1, precio);
      this.pedidoService.__registrar_pedido(usuarioLS.token, pedido).subscribe((resp: any)=>{
      this.authService.updateUsuarioPedido(resp);
      alert("Producto añadido");
      this.__refrescarTotales();
      });
    } 
  }
  __obtener_productos() {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.ps.__obtener_productos_json(usuarioLS.token).subscribe((rest: any) => {
        this.products = rest
        console.log(rest);
        
      })      
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
          this.cantidad = this.cantidad + 1;
        });
        this.authService.actualizarCantidad(this.cantidad);
        this.authService.actualizarNumero(this.total);
        }); 
    }    
   
  }
  ngOnInit() :void {
    
    this.__obtener_productos();
    this.__refrescarTotales()
  }
}
