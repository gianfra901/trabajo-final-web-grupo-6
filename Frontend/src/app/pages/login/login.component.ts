import { Component, Inject } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../../application/service/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private readonly ps: AuthService,
    private fb:FormBuilder,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}  

  contactusForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
  })
  __on_enviar() {
    if(this.contactusForm.valid) {
      this.ps.__obtener_tokenauth_json(
        this.contactusForm.value.correo +"",
        this.contactusForm.value.contrasena + ""
      ).subscribe((rest: any) => {
        console.log(rest);
        
        localStorage.setItem("customer", JSON.stringify(rest));
        this.router.navigate(['']).then(() => {
            window.location.reload();
          });
      },
      (err:any)=>{
        if(err.status == 400){
          this.error(err.error.errorMessage);
        }
      }
    )
    } else {
      this.error("Formulario no valido")
    }
  }
  ngOnInit() :void {
  }
  error(message: string): void {
    this.toastr.error(message, "Error");
  }   
}
