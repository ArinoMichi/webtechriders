export class CursoDetalles {
    constructor(
        public id: number,
        public idProfesor: number,
        public profesor: string,
        public emailProfesor: string,
        public telefonoProfesor: string,
        public idCurso: number,
        public nombreCurso: string,
        public descripcionCurso: string,
        public idCentro: number,
        public centro: string,
        public idProvinciaCentro: number,
        public provinciaCentro: string
    ){}
}