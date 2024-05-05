import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProjectService } from '../../application/service/project.service';
import { AuthService } from '../../application/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private readonly ps: ProjectService, private readonly authService: AuthService) {}  
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

  __on_agregar_carrito() {
    localStorage.setItem("carrito", "1");
  }
  __obtener_productos() {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    {
      this.ps.__obtener_productos_json(usuarioLS.token).subscribe((rest: any) => {
        this.products = rest
      })      
    } 


  }
  ngOnInit() :void {
    
    this.__obtener_productos()
  }
}
