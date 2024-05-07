import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';
import { RegistrarClienteModel } from '../../application/models/ClienteModel';
import { AuthService } from '../../application/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private fb:FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  datosForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    direccion: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required, Validators.maxLength(9)],
    dni: ['', Validators.required],
    contrasena: ['', Validators.required]
  })
  __on_registrar_cliente(){
    if (this.datosForm != null){
      if(this.datosForm.valid) {
        let cliente = new RegistrarClienteModel(
          this.datosForm.get("nombres")?.value + "",
          this.datosForm.get("apellidos")?.value + "",
          this.datosForm.get("dni")?.value + "",
          this.datosForm.get("direccion")?.value + "",
          this.datosForm.get("correo")?.value + "",
          this.datosForm.get("telefono")?.value + "",
          this.datosForm.get("contrasena")?.value + ""
        );
        this.authService.__registrar_cliente_json(cliente).subscribe(async (resp:any)=>{
          if (resp>=1){
            this.success("Usuario Registrado.")
              await new Promise(f => setTimeout(f, 2500));
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });
          }
        });
      }else{
        this.error("Formulario no valido");
      }
    }
  }
  success(message: string): void {
    this.toastr.success(message, "Éxito");
  }
  error(message: string): void {
    this.toastr.error(message, "Error");
  }   
}
