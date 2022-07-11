import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  public titulo: string = '';
  public breadcrums: any[] = [];
  private subs$: Subscription;

  constructor( private router: Router) { 
    this.subs$ = this.cargarDatos()
                      .subscribe( data => {
                        console.log(data)
                        this.titulo = data['titulo'];
                        this.breadcrums = data['breadcrums'];
                      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('salidmos de bread')
    this.subs$.unsubscribe();
  }

  cargarDatos() {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: any) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data)
      );
  }

}

