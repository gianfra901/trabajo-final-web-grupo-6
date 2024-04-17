import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProjectService } from '../service/project.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  
  constructor(private readonly ps: ProjectService) {}  
  projects : any = []

  __obtener_proyectos() {
    this.ps.__obtener_proyectos_json().subscribe((rest: any) => {
      this.projects = rest
      console.log(this.projects)
    })
  }

  ngOnInit() :void {
    this.__obtener_proyectos()
  }
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
}
