import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmint = false;
  public waiting = false;

  public loginForm = this.fb.group({
    email: ['tonystar@gmail.com'||'', [Validators.required, Validators.email] ],
    password: ['12345', Validators.required ],
    remember: [ false ]
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  ngOnInit(): void {
    
  }

  login() {
    this.formSubmint = true;

    console.log(this.loginForm.valid)
    console.log(this.loginForm.value)
    //console.log(this.email?.value)
    if (!this.loginForm.valid) {
      console.warn('Errores en le formulario');
      return;
    }
    this.waiting = true;
    this.usuarioService.login( this.loginForm.value)
    .subscribe( (res: any) =>{
      console.log('respuesta al subcrib', res)
      console.log(res.token)
      //localStorage.setItem('token', res.token);
      //localStorage.setItem('email', this.loginForm.get('email'));
      this.router.navigateByUrl('/dashboard');
   
    }, (err) => {
      console.warn('Error respueta api:',err);
      Swal.fire({
        title: 'Error!',
        text: err.error.msg || 'No pudo completarse la acción, vuelva a intentarlo más tarde',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      });
      this.waiting = false; });


  }

  campoValido( campo: string) {
    //return this.loginForm.get(campo).valid || !this.formSubmint;
  }
}
