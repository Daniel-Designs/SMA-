import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AsignaturaService } from '../../../services/asignatura.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import { RubricaService } from 'src/app/services/rubrica.service';
import { Rubrica } from 'src/app/models/rubrica.model';
import { Asignatura } from 'src/app/models/asignatura.model';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrls: ['./rubrica.component.css']
})
export class RubricaComponent implements OnInit {
  public datosForm = this.fb.group({
    uid: ['', Validators.required],
    asignatura: ['', Validators.required ],
    dimensiones: ['', Validators.required ],
    valoraciones: ['', Validators.required ]
  });
  public rubrica: Rubrica;
  public asignaturas: Asignatura[]=[];
  public submited = false;
  public uid: string = 'nuevo';



  public tab = 1;
  
  constructor(private fb: FormBuilder,
              private asignaturaService: AsignaturaService,
              private cursosService: CursoService,
              private rubricaService: RubricaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarRubricas();
    this.cargarAsignaturas();
    this.uid = this.route.snapshot.params['uid'];
    //console.log(this.uid)
    this.datosForm.get('uid').disable();
    this.datosForm.get('uid').setValue(this.uid);
    this.cargarDatos(this.uid);
  }

   
  cargarDatos( uid: string ) {
   /* this.submited = false;
    if (this.uid !== 'nuevo') {
      this.rubricaService.cargarRubricas(this.uid)
        .subscribe( res => {
          if (!res['rubricas']) {
            this.router.navigateByUrl('/admin/rubricas');
            return;
          };
          
          this.rubrica = res['rubricas'];
          this.datosForm.get('asignatura').setValue(this.rubrica.asignatura.nombrecorto);
          //this.datosForm.get('dimensiones').setValue(this.rubrica.dimensiones);
          //this.datosForm.get('valoraciones').setValue(this.rubrica.valoraciones);
          //this.datosForm.get('curso').setValue(res['asignaturas'].curso._id);
          this.datosForm.markAsPristine();
          this.submited = true;
        }, (err) => {
          this.router.navigateByUrl('/admin/rubricas');
          Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo'});
          return;
        });
    } else {
      this.nuevo();
      
    }*/

  }

  enviar() {
    this.submited = true;
    if (this.datosForm.invalid) { return; }

    // Si estamos creando uno nuevo
    if (this.uid === 'nuevo') {
      this.rubricaService.crearRubrica( this.datosForm.value )
        .subscribe( res => {
          this.uid = res['rubrica'].uid;
          this.datosForm.get('uid').setValue( this.uid );
          this.datosForm.markAsPristine();
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({icon: 'error', title: 'Oops...', text: msgerror,});
        })
    } else {
      // ACtualizamos
      this.rubricaService.actualizarRubrica( this.uid, this.datosForm.value)
        .subscribe( res => {
          this.datosForm.markAsPristine();
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({icon: 'error', title: 'Oops...', text: msgerror,});
        })
    } 

  }

  nuevo() {
  /*  this.uid = 'nuevo';
    this.datosForm.reset();
    this.submited = false;
    this.datosForm.get('uid').setValue(this.uid)
    this.datosForm.get('uid').disable();
    this.datosForm.get('nombre').setValue('');
    this.datosForm.get('nombrecorto').setValue('');
    this.datosForm.get('curso').setValue('');
    this.datosForm.get('numeroEvaluacionesContinuas').setValue(1);
    this.datosForm.markAsPristine();*/

  }

  cancelar() {
    if (this.uid === 'nuevo') {
      this.router.navigateByUrl('/admin/asignaturas');
    } else {
      this.cargarDatos(this.uid);
    }
  }

  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.submited;
  }

  esnuevo(): boolean {
    if (this.uid === 'nuevo') { return true; }
    return false;
  }

  cargarRubricas() {
    // cargamos todos los cursos
    this.rubricaService.cargarRubricas('')
      .subscribe( res => { 
      
      });
  }

  cargarAsignaturas() {
    // cargamos todos los cursos
    this.asignaturaService.cargarAsignatura2('')
      .subscribe( res => {
        this.asignaturas = res['asignaturas'];
        console.log(this.asignaturas)
      });
  }

}
