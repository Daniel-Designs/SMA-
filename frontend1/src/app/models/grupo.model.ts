import { Usuario } from './usuario.model';

import { Asignatura } from './asignatura.model';

export class Grupo {
    constructor(
        public nombre: string,
        public proyecto: string,
        public proyectodes: string,
        public asignatura: Asignatura,
        public alumnos?: Usuario[],
        public uid?: string,
    )
    {}
}