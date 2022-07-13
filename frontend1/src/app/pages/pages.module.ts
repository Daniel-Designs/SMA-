import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';
import { NavbarComponent } from '../commons/navbar/navbar.component';
import { BreadcrumbComponent } from '../commons/breadcrumb/breadcrumb.component';
import { ProgressbarComponent } from '../components/progressbar/progressbar.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
// Componente de admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
// Componentes de profesor
import { DashboardprofComponent } from './prof/dashboardprof/dashboardprof.component';
// Componentes de alumno
import { DashboardaluComponent } from './alu/dashboardalu/dashboardalu.component';
import { PerfilComponent } from './perfil/perfil.component';

import { CursosComponent } from './admin/cursos/cursos.component';
import { CursoComponent } from './admin/curso/curso.component';

import { AsignaturasComponent } from './admin/asignaturas/asignaturas.component';
import { AsignaturaComponent } from './admin/asignatura/asignatura.component';
import { SelectusersComponent} from '../commons/selectusers/selectusers.component';
import { GruposComponent } from './admin/grupos/grupos.component';
import { GrupoComponent } from './admin/grupo/grupo.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    UsuariosComponent,
    BreadcrumbComponent,
    ProgressbarComponent,
    PaginationComponent,
    UsuarioComponent,
    DashboardprofComponent,
    DashboardaluComponent,
    PerfilComponent,
    CursosComponent,
    CursoComponent,  
    AsignaturasComponent,
    AsignaturaComponent,
    SelectusersComponent,
    GruposComponent,
    GrupoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
