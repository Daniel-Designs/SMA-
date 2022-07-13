import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public nombre: string='';

  constructor( private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre')
  }

  logout() {
    this.usuarioService.logout();
  }
}
