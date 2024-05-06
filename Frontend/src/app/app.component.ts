import { Component, OnInit } from '@angular/core';
import { AuthService } from './application/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tiendaverde';
  usuario: string = "";
  totalCarrito = this.authService.numeroCarrito$;
  totalCantidad = this.authService.numeroCantidad$;

  constructor(private readonly authService: AuthService, private router: Router) {}  

  ngOnInit() :void {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
      {
      this.usuario = usuarioLS.nombres;
    }    
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
}
