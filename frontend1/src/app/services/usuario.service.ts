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

              nuevoUsuario ( data: Usuario) {
                return this.http.post(`${environment.base_url}/usuarios/`, data, this.cabeceras);
              }
            
              actualizarUsuario ( uid: string, data: Usuario) {
                return this.http.put(`${environment.base_url}/usuarios/${uid}`, data, this.cabeceras);
              }
            
              cambiarPassword( uid: string, data: any) {
                return this.http.put(`${environment.base_url}/usuarios/np/${uid}`, data, this.cabeceras);
              }
              
            
              cargarUsuario( uid: string) {
                if (!uid) { uid = '';}
                return this.http.get(`${environment.base_url}/usuarios/?id=${uid}` , this.cabeceras);
              }
            
              cargarUsuarios( desde: number, textoBusqueda?: string ): Observable<object> {
                if (!desde) { desde = 0;}
                if (!textoBusqueda) {textoBusqueda = '';}
                return this.http.get(`${environment.base_url}/usuarios/?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
              }

              cargarListaUsuarios ( uids: string[]) {
                const data = { lista: uids };
                return this.http.post(`${environment.base_url}/usuarios/lista` , data, this.cabeceras);
              }
              cargarUsuariosRol ( rol: string, uids: string[]) {
                const data = { lista: uids };
                return this.http.post(`${environment.base_url}/usuarios/rol/${rol}`, data, this.cabeceras);
              }
            
              borrarUsuario( uid: string) {
                if (!uid || uid === null) {uid = 'a'; }
                return this.http.delete(`${environment.base_url}/usuarios/${uid}` , this.cabeceras);
              }            

  login( formData: any) {
    return this.http.post(`${environment.base_url}/login`, formData).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        localStorage.setItem('nombre', res.nombre);
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
  establecerimagen(nueva: string): void {
    //this.usuario.imagen = nueva;
  }

  establecerdatos(nombre: string, apellidos: string, email: string): void {
    this.usuario.nombre = nombre;
    this.usuario.apellidos = apellidos;
    this.usuario.email = email;
  }
  
  get cabeceras() {
    return {
      headers: {
        'x-token': this.token
      }};
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid;
  }

  get rol(): string {
    return this.usuario.rol;
  }

  get nombre(): string{
    return this.usuario.nombre;
  }

  get apellidos(): string{
    return this.usuario.apellidos;
  }

  get email(): string{
    return this.usuario.email;
  }


}

