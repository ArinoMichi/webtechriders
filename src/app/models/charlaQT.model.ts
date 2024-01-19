export class CharlaQT {
    constructor(
        public idCharla: number,
        public descripcionCharla: string,
        public fechaCharla: Date,
        public idEstadoCharla: number,
        public estadoCharla: string,
        public idProvincia: number,
        public provincia: string,
        public idCurso: number,
        public nombreCurso: string,
        public observacionesCharla: string,
        public fechaSolicitudCharla: Date,
        public modalidad: string,
        public idTechRider: number,
        public techRider: string,
        public email: string,
        public telefono: string,
    ) {}
}
