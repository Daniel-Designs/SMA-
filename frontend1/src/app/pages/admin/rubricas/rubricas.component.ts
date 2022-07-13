import { Component, OnInit, OnDestroy } from '@angular/core';
import { Asignatura } from '../../../models/asignatura.model';
import { environment } from '../../../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { AsignaturaService } from '../../../services/asignatura.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Rubrica } from 'src/app/models/rubrica.model';
import { RubricaService } from 'src/app/services/rubrica.service';
@Component({
  selector: 'app-rubricas',
  templateUrl: './rubricas.component.html',
  styleUrls: ['./rubricas.component.css']
})
export class RubricasComponent implements OnInit {

  // Control de paginación
  public totalregistros: number = 0;
  public registroactual: number = 0;
  public registrosporpagina: number = environment.registros_por_pagina;
  // Control del loading
  public loading = false;
  // Cursos lsitado
  public listaRegistros: Asignatura[] = [];
  // Ultima búsqueda
  public ultimaBusqueda = '';

  public buscarForm = this.fb.group({
    texto: [''],
    curso: ['']
  });
  public subs$: Subscription;

  public rubricas: Rubrica[] = [];

  constructor( private fb: FormBuilder,
               private cursosService: CursoService,
               private rubricaService: RubricaService,
               private asigaturaService: AsignaturaService,
               private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarRubrica();
    /*this.cargarAsignaturas();
    this.subs$ = this.buscarForm.valueChanges
      .subscribe( event => {
        this.cargarAsignaturas();
      });*/
  }

  borrar() {
   /* this.buscarForm.reset();
    this.cargarAsignaturas();*/
  }

  cargarAsignaturas() {
    /*this.loading = true;
    const curso = this.buscarForm.get('curso').value;
    const texto = this.buscarForm.get('texto').value || '';
    this.asigaturaService.listaAsignaturas( this.registroactual, texto, curso)
      .subscribe( res => {
        this.listaRegistros = res['asignaturas'];
        this.totalregistros = res['page'].total;
      });

    this.loading = false;*/
  }

  cargarRubrica() {
    // cargamos todos los cursos
    this.rubricaService.cargarRubricas('')
      .subscribe( res => {
        this.rubricas = res['rubricas'];
        console.log(this.rubricas)
        this.listaRegistros = res['asignaturas'];
        this.totalregistros = res['page'].total;
      });
  }
  eliminarRubrica(uid:any) {
    // Solo los admin pueden borrar usuarios
    if (this.usuarioService.rol !== 'ADMINISTRADOR') {
      Swal.fire({icon: 'warning', title: 'Oops...', text: 'No tienes permisos para realizar esta acción', });
      return;
    }

    Swal.fire({
      title: 'Eliminar Rubrica',
      text: `Al eliminar la rubrica '${uid}' se perderán todos los datos asociados. ¿Desea continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
          if (result.value) {
            this.rubricaService.eliminarRubrica(uid)
              .subscribe( resp => {
                this.cargarRubrica();
              }
              ,(err) => {
                Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
              });
          }
      });
  }

 

  
  cambiarPagina( pagina: number) {
    pagina = (pagina < 0 ? 0 : pagina);
    this.registroactual = ((pagina - 1) * this.registrosporpagina >=0 ? (pagina - 1) * this.registrosporpagina : 0);
    //this.cargarAsignaturas();
  }

  ngOnDestroy() {
    //this.subs$.unsubscribe();
  }

}
