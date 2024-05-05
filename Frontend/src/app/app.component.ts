import { Component, OnInit } from '@angular/core';
import { AuthService } from './application/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tiendaverde';
  usuario: string = "";
  constructor(private readonly ps: AuthService) {}  

  ngOnInit() :void {
    var ls = localStorage.getItem("customer");
    if (ls != null){
      var data = JSON.parse(ls);
      this.usuario = data.nombres;
      console.log(data.nombres);
    }
  }  
  onActivate(event: any) {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
}
