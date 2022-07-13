import { Injectable } from '@angular/core';
import { sidebarItem } from '../interfaces/sidebar.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: sidebarItem[] =[
    { titulo: 'Dashboard Admin', icono: 'fa fa-tachometer-alt', sub: false, url: '/admin/dashboard'},
    { titulo: 'Gestión usuarios', icono: 'fa fa-users', sub: false, url: '/admin/usuarios'},
    { titulo: 'Gestión cursos', icono: 'fa fa-calendar-alt', sub: false, url: '/admin/cursos'},
    { titulo: 'Gestión asignaturas', icono: 'fa fa-sticky-note', sub: false, url: '/admin/asignaturas'},
    { titulo: 'Gestión grupos', icono: 'fa fa-object-group', sub: false, url: '/admin/grupos'},
  ];
  menuAlumno: sidebarItem[]=[
    { titulo: 'Mis notas', icono: 'fa fa-tachometer-alt', sub: false, url: '/usuario/dashboard'},
    { titulo: 'Evaluar a mi equipo', icono: 'fa fa-users', sub: false, url: '/usuario'},
    { titulo: 'Mis graficas', icono: 'fa fa-calendar-alt', sub: false, url: '/usuario'},
  ];
  menuProfesor: sidebarItem[]=[
    { titulo: 'Mis grupos', icono: 'fa fa-tachometer-alt', sub: false, url: '/prof/dashboard'},
    { titulo: 'Notas', icono: 'fa fa-copy', sub: false, url: '/prof/asignaturas'},
  ];
  none: sidebarItem[]=[
    { titulo: 'error', icono: 'fa fa-exclamation-triangle', sub: false, url: '/error'}
  ]
  constructor() { }
  getMenu(){
    const rol = localStorage.getItem('rol');
    switch(rol){
      case 'ADMINISTRADOR':
        return this.menuAdmin;
        case 'PROFESOR':
          return this.menuProfesor;
          case 'ALUMNO':
            return this.menuAlumno;

    }

    return [];

  }
}
