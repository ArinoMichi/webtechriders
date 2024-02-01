export class Curso {
    constructor(
        public idCurso: number,
        public idCentro: number | null,
        public nombreCurso: string,
        public descripcion: string
    ) {}
}
