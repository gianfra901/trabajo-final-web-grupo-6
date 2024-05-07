import { Component, Inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../application/service/producto.service';
import { AuthService } from '../../application/service/auth.service';
import { PedidoService } from '../../application/service/pedido.service';
import { PedidoModel } from '../../application/models/PedidoModel';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  total: number = 0;
  cantidad: number = 0;

  constructor(
    private readonly ps: ProductService, 
    private readonly authService: AuthService, 
    private readonly pedidoService: PedidoService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr  
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
      this.success("Producto añadido");
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
    }else{
      this.info("Inicie sesión para añadir productos.");
    }
  }
  __obtener_productos() {
    this.ps.__obtener_productos_json().subscribe((rest: any) => {
      this.products = rest;
    })     
  }
  __on_detalle_producto(idProducto: string) {
    this.router.navigate([`/shop-details/${idProducto}`]);
  }  
  ngOnInit() :void { 
    this.__obtener_productos();
  }
  success(message: string): void {
    this.toastr.success(message, "Éxito");
  }
  info(message: string): void {
    this.toastr.info(message, "Info");
  }  
}
