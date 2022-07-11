import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginForm  } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Usuario} from '../models/usuario.model'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario ;

  constructor( private http: HttpClient,
               private router: Router ) { }

  login( formData: any) {
    return this.http.post(`${environment.base_url}/login`, formData).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
      })
    );;
  }

  logout() {
    this.limpiarLocalStorage();
    this.router.navigateByUrl('/login');
  }

 

  validarToken(): Observable<boolean> {
   return this.validar(true,false);
  }

  validarNoToken(): Observable<boolean> {
    return this.validar(false,true);
  }  
  validar(correcto:boolean,incorrecto:boolean): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    if (token === '') {
      this.limpiarLocalStorage();
      return of(incorrecto);
    }

    return this.http.get(`${environment.base_url}/login/token`, {
      headers: {
        'x-token':token
      }
      }).pipe(
        tap( (res: any) => {
          const { uid, rol, token} = res;
          localStorage.setItem('token', token);
          this.usuario = new Usuario(uid, rol);
        }),
        map ( resp => {
          return correcto;
        }),
        catchError ( err => {
          console.warn("Error validar no token",err)
         this.limpiarLocalStorage();
          return of(incorrecto);
        })
      )
  }

  limpiarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  get uid(): string {
    return this.usuario.uid;
  }

  get rol(): string {
    return this.usuario.rol;
  }

}

