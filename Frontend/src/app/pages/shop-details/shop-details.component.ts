import { Component, Inject } from '@angular/core';
import { ProductService } from '../../application/service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../application/service/pedido.service';
import { AuthService } from '../../application/service/auth.service';
import { PedidoModel } from '../../application/models/PedidoModel';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent {
  products : any = []
  total: number = 0;
  cantidad: number = 0;  
  product: any;
  constructor(
    private readonly ps: ProductService,
    private readonly authService: AuthService, 
    private readonly pedidoService: PedidoService,    
    private routeActive: ActivatedRoute,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}  
  getParams(){
    this.routeActive.params.subscribe(params => {
      if(params){
        this.ps.__obtener_producto_detalle_json(params["id"]).subscribe((rest: any) => {
          this.product = rest;
        })  
     }
    })
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
  __on_detalle_producto(idProducto: string) {
    this.router.navigate([`/shop-details/${idProducto}`]);
    window.scroll(0,0);
  }    
  ngOnInit() :void { 
    this.getParams();
    this.ps.__obtener_productos_top_items_json(4).subscribe((rest: any) => {
      this.products = rest;
    })  
  }
  success(message: string): void {
    this.toastr.success(message, "Éxito");
  }
  info(message: string): void {
    this.toastr.info(message, "Info");
  }
}
