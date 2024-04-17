import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiendaverde';
  onActivate(event: any) {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
}
