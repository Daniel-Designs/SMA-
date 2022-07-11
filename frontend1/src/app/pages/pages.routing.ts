import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [

  { path: 'admin', component: AdminLayoutComponent, canActivate: [ AuthGuard], data: {rol: 'ADMINISTRADOR'}, 
    children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Dashboard',
                                                        breadcrums: []
                                                      },},
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ADMINISTRADOR',
                                                        titulo: 'Usuarios',
                                                        breadcrums: [ ],
                                                      },},
    /*{ path: 'usuarios/usuario/:uid', component: UsuarioComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Usuario',
                                                        breadcrums: [ {titulo: 'Usuarios', url: '/admin/usuarios'} ],
                                                      },},*/
    
    { path: '**', redirectTo: 'dashboard'}
  ]},
  /*
  { path: 'prof', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'ROL_PROFESOR'},
    children: [
    { path: 'dashboard', component: DashboardprofComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_PROFESOR',
                                                        titulo: 'DashboardX',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'dashboard'}
  ]},

  { path: 'alu', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'ROL_ALUMNO'}, 
    children: [
    { path: 'dashboard', component: DashboardaluComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_ALUMNO',
                                                        titulo: 'Dashboard',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'dashboard'}
  ]},*/
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

