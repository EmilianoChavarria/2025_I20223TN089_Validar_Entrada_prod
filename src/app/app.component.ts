import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'formulario';
  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.pattern(/^[A-Za-z .& \s]+$/)]],
      rfc: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,4}[0-9]{6}[A-Za-z0-9]{2,3}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contacto: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      console.log("Formulario enviado:", this.formulario.value);
      alert("Formulario enviado correctamente");
    } else {
      console.log("Formulario inválido");
      this.formulario.markAllAsTouched(); 
    }
  }

  esCampoVacio(campo: string): boolean {
    return this.formulario.controls[campo].hasError('required') && this.formulario.controls[campo].touched;
  }

  esCampoInvalido(campo: string): boolean {
    return (this.formulario.controls[campo].hasError('pattern') || 
            this.formulario.controls[campo].hasError('email')) && 
            this.formulario.controls[campo].touched;
  }
}
