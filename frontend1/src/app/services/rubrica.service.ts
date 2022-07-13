import { Injectable } from '@angular/core';
import { environment  } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RubricaService {

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService) { }

  listaRubricas(desde: number, texto: string, curso: string) {
    if (!texto) {
      texto = '';
    } else {
      texto = `&texto=${texto}`;
    }
    if (!curso) {
      curso = '';
    } else {
      curso = `&curso=${curso}`;
    }
    return this.http.get(`${environment.base_url}/asignaturas/?desde=${desde}${texto}${curso}` , this.cabeceras);
  }

  cargarRubricas(uid: string) {
    return this.http.get(`${environment.base_url}/rubrica?uid:=${uid}`, this.cabeceras);
  }
  cargar2(uid: string) {
    return this.http.get(`${environment.base_url}/asignaturas/`, this.cabeceras);
  }
  listaMisRubricas(desde: number, texto: string, curso: string) {
    const uid = this.usuarioService.uid;
    if (!texto) {
      texto = '';
    } else {
      texto = `&texto=${texto}`;
    }
    if (!curso) {
      curso = '';
    } else {
      curso = `&curso=${curso}`;
    }
    return this.http.get(`${environment.base_url}/asignaturas/?idprof=${uid}&desde=${desde}${texto}${curso}` , this.cabeceras)
    .pipe(
      tap( (res: any) => {
       console.log(res)      })
    );
  }

  crearRubrica(data) {
    return this.http.post(`${environment.base_url}/rubrica/`, data, this.cabeceras);
  }

  actualizarRubrica( uid:string, data ) {
    return this.http.put(`${environment.base_url}/rubrica/${uid}`, data, this.cabeceras);
  }

  
  eliminarRubrica (uid: string) {
    return this.http.delete(`${environment.base_url}/rubrica/${uid}`, this.cabeceras);
  }

  get cabeceras(): object {
    return {
      headers: {
        'x-token': this.token
      }};
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
}
