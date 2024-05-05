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

  constructor(private readonly ps: ProjectService, readonly authService: AuthService) {}  
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

  __on_agregarCarrito() {
    localStorage.setItem("carrito", "1");
  }
  __obtener_productos() {
    let token = this.authService.getUsuarioFromSession().token;
    this.ps.__obtener_productos_json(token).subscribe((rest: any) => {
      this.products = rest
    })
  }
  ngOnInit() :void {
    
    this.__obtener_productos()
  }
}
