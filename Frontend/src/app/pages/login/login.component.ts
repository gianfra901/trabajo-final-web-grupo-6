import { Component } from '@angular/core';
import { AuthService } from '../../application/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private readonly ps: AuthService, private fb:FormBuilder, private router: Router) {}  

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
        localStorage.setItem("customer", JSON.stringify(rest));
        this.router.navigate(['']).then(() => {
            window.location.reload();
          });
      })
    } else {
      alert("Formulario no valido")
    }
  }
  ngOnInit() :void {
  }
}
