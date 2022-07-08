import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginForm  } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router  ) { }

  login( formData: any) {
    return this.http.post(`${environment.base_url}/login`, formData).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
      })
    );;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
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
      return of(incorrecto);
    }

    return this.http.get(`${environment.base_url}/login/token`, {
      headers: {
        'x-token':token
      }
      }).pipe(
        tap( res => {
          console.log('token renovado');
        }),
        map ( resp => {
          return correcto;
        }),
        catchError ( err => {
          console.warn("Error validar no token",err)
          localStorage.removeItem('token');
          return of(incorrecto);
        })
      )
  }



}
