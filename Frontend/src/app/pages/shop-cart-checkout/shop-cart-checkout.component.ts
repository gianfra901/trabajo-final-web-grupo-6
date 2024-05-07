import { Component, Inject } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { PedidoService } from '../../application/service/pedido.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';

@Component({
  selector: 'app-shop-cart-checkout',
  templateUrl: './shop-cart-checkout.component.html',
  styleUrl: './shop-cart-checkout.component.css'
})
export class ShopCartCheckoutComponent {
  detallePedido : any = []  
  total: number = 0;
  subtotal: number = 0;
  descuento: number = 0;
  cantidad: number = 0;

  nombres: string = "";
  apellidos: string = "";
  direccion: string = "";
  dni: string = "";
  correo: string = "";
  telefono: string = "";

  constructor(
    private readonly authService: AuthService, 
    private readonly pedidoService: PedidoService, 
    private router: Router, 
    private fb:FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}
  
  checkoutForm = this.fb.group({
    direccion: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required]
  })
    
  ngOnInit() :void {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.nombres = usuarioLS.nombres;
      this.apellidos = usuarioLS.apellidos;
      this.direccion = usuarioLS.direccion;
      this.dni = usuarioLS.dni;
      this.correo = usuarioLS.correo;
      this.telefono = usuarioLS.telefono;
    }
    this.__obtener_pedidoDetalle();
  }
  __obtener_pedidoDetalle() {
    this.total = 0;
    this.subtotal = 0;
    this.descuento = 0;
    this.cantidad = 0;
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.pedidoService.__obtener_pedido(usuarioLS.token, usuarioLS.idPedido).subscribe((rest: any) => {
        this.detallePedido = rest;
        rest.forEach((x: any) => {
          this.subtotal = this.subtotal+ x.total;
          this.cantidad = this.cantidad + 1;
        });
        this.total = this.subtotal;
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

  __on_actualizarEstado_pedido() {
    if(this.checkoutForm.valid) {
      this.total = 0;
      this.cantidad = 0;
      let usuarioLS = this.authService.getUsuarioFromSession();
      if (usuarioLS != null)
      {
        this.pedidoService.__actualizarEstado_pedido(usuarioLS.token, usuarioLS.idPedido, true).subscribe(async (rest: any) => {
          if (rest>=1){
            this.__obtener_pedidoDetalle();
            this.authService.actualizarTotalesCarrito();
            this.success("Pedido completado satisfactoriamente.")
            await new Promise(f => setTimeout(f, 2500));
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
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
    } else {
      this.error("Formulario no valido");
    }
  }
  __on_aplicar_cupon(){
    let codigoCupon = (<HTMLInputElement>document.getElementById("txtCupon")).value
    if (codigoCupon == "FINAL"){
      this.info("Ha ganado un 10% de descuento.");
      this.descuento = this.subtotal * 0.1;
      this.total = this.subtotal - this.descuento;
      this.authService.actualizarTotalesCarrito();
    }else{
      this.error("No existe cupón.");
    }
  }  
  error(message: string): void {
    this.toastr.error(message, "Error");
  }   
  success(message: string): void {
    this.toastr.success(message, "Éxito");
  }
  info(message: string): void {
    this.toastr.info(message, "Info");
  }  
}
