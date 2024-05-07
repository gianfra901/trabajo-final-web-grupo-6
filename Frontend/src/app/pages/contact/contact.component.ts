import { Component, Inject } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';

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
    private fb:FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}
  
  contactusForm = this.fb.group({
    nombresyApellidos: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required],
  })
  __on_enviar() {
    if(this.contactusForm.valid) {
      this.nombresyApellidos = "";
      this.correo = "";
      this.success("Mensaje enviado")
    } else {
      this.error("Formulario no valido")
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
  error(message: string): void {
    this.toastr.error(message, "Error");
  }
  success(message: string): void {
    this.toastr.success(message, "Éxito");
  }   
}
