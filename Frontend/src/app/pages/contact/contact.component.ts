import { Component } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private readonly ps: AuthService) {}  
  ngOnInit() :void {
    console.log(this.ps.getUsuarioFromSession().token);
  }  
}
