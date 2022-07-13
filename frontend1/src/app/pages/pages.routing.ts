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
/*
  /perfil                               [*]
  /admin/* --> páginas de administrador [ROL_ADMIN]
  /prof/*  --> páginas de profesor      [ROL_PROFESOR]
  /alu/*   --> páginas de alumno        [ROL_ALUMNO]

  data --> pasar informacion junto a la ruta para breadcrums y para AuthGuard {rol: 'ROL_ADMIN/ROL_PROFESOR/ROL_ALUMNO/*'}

*/

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
                                                    
    { path: '**', redirectTo: 'dashboard'}
  ]},

  { path: 'prof', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'PROFESOR'},
    children: [
    { path: 'dashboard', component: DashboardprofComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'PROFESOR',
                                                        titulo: 'Dashboard Profesor',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'dashboard'}
  ]},

  { path: 'alu', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'ALUMNO'}, 
    children: [
    { path: 'dashboard', component: DashboardaluComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ALUMNO',
                                                        titulo: 'Dashboard Alumno',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'dashboard'}
  ]},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
