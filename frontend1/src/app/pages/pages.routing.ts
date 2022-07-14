import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
import { DashboardprofComponent } from './prof/dashboardprof/dashboardprof.component';
import { DashboardaluComponent } from './alu/dashboardalu/dashboardalu.component';
import { PerfilComponent } from './perfil/perfil.component'
import { CursosComponent } from './admin/cursos/cursos.component';
import { CursoComponent } from './admin/curso/curso.component';
import { AsignaturasComponent } from './admin/asignaturas/asignaturas.component';
import { AsignaturaComponent } from './admin/asignatura/asignatura.component';
import { GruposComponent } from './admin/grupos/grupos.component';
import { GrupoComponent } from './admin/grupo/grupo.component';
import { RubricaComponent } from './admin/rubrica/rubrica.component';
import { RubricasComponent } from './admin/rubricas/rubricas.component';
import { MisGruposComponent } from './prof/mis-grupos/mis-grupos.component';
import { AsignarNotasComponent } from './prof/asignar-notas/asignar-notas.component';
import { MisNotasComponent } from './alu/mis-notas/mis-notas.component';
import { GraficasComponent } from './alu/graficas/graficas.component';
import { EvaluarComponent } from './alu/evaluar/evaluar.component';


const routes: Routes = [

  { path: 'admin', component: AdminLayoutComponent, canActivate: [ AuthGuard], data: {rol: 'ADMINISTRADOR'}, 
    children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Dashboard Admin',
                                                        breadcrums: []
                                                      },},
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Usuarios',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'usuarios/usuario/:uid', component: UsuarioComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Usuario',
                                                        breadcrums: [ {titulo: 'Usuarios', url: '/admin/usuarios'} ],
                                                      },},
   { path: 'cursos', component: CursosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Cursos',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'cursos/curso/:uid', component: CursoComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Curso',
                                                        breadcrums: [ {titulo: 'Usuarios', url: '/admin/cursos'} ],
                                                      },},
    { path: 'asignaturas', component: AsignaturasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Asignaturas',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'asignaturas/asignatura/:uid', component: AsignaturaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Asignatura',
                                                        breadcrums: [ {titulo: 'Asignaturas', url: '/admin/asignaturas'} ],
                                                      },},
    { path: 'grupos', component: GruposComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Grupos',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'grupos/grupo/:uid', component: GrupoComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Grupo',
                                                        breadcrums: [ {titulo: 'Grupos', url: '/admin/grupos'} ],
                                                      },},
    { path: 'cursos', component: CursosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Cursos',
                                                        breadcrums: [ ],
                                                      },},
                                                    
{ path: 'rubricas', component: RubricasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Rubrica',
                                                        breadcrums: [ ],
                                                      },},
{path: 'rubricas/rubrica/:uid', component: RubricaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Rubrica',
                                                        breadcrums: [ ],
                                                      },},                                                   
    { path: '**', redirectTo: 'dashboard'}
  ]},

  { path: 'prof', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'PROFESOR'},
    children: [
    { path: 'misGrupos', component: MisGruposComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'PROFESOR',
                                                        titulo: 'Grupos Profesor',
                                                        breadcrums: []
                                                      },},
    { path: 'Notas', component: AsignarNotasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'PROFESOR',
                                                        titulo: 'Notas Profesor',
                                                        breadcrums: []
                                                      },},
    
    { path: '**', redirectTo: 'misGrupos'}
  ]},

  { path: 'alu', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'ALUMNO'}, 
    children: [
    { path: 'misNotas', component: MisNotasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ALUMNO',
                                                        titulo: 'Mis Notas ',
                                                        breadcrums: []
                                                      },},  
    
   { path: 'misGraficas', component: GraficasComponent , canActivate: [ AuthGuard ], data: { 
                                                        rol:'ALUMNO',
                                                        titulo: ' Mis graficas',
                                                        breadcrums: []
                                                      },}, 
    { path: 'evaluar', component: EvaluarComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ALUMNO',
                                                        titulo: 'Evaluacion',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'misNotas'}
  ]},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
