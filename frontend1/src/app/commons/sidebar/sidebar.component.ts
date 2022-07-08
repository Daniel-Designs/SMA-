import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { sidebarItem } from '../../interfaces/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  menu: sidebarItem[] = [];
  constructor( private sidebar: SidebarService) { }

  ngOnInit(): void {
    this.menu = this.sidebar.getMenu();
  }
}
