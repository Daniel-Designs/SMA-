import { Asignatura } from './asignatura.model';

export class Rubrica {
    constructor(
        public uid?: string[],
        public dimensiones?: string[],
        public valoraciones?: string[],
        public asignatura?: Asignatura,
    )
    {}
}
