import { Component } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  nombresyApellidos: string = "";
  correo: string = "";
  constructor(
    private readonly authService: AuthService,
    private fb:FormBuilder
  ) {}
  
  contactusForm = this.fb.group({
    nombresyApellidos: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required],
  })
  __on_enviar() {
    if(this.contactusForm.valid) {
      console.log(this.contactusForm.value)
    } else {
      alert("Formulario no valido")
    }
  }
  ngOnInit() :void {
    let usuarioLS = this.authService.getUsuarioFromSession();
    if (usuarioLS != null)
    { 
      this.nombresyApellidos = usuarioLS.nombres+' '+usuarioLS.apellidos;
      this.correo = usuarioLS.correo;
    }
  }  
}
