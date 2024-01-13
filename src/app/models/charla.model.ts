export class Charla {
    constructor(
        public idCharla: number,
        public descripcion: string,
        public idEstadoCharla: number,
        public fechaCharla: Date,
        public observaciones: string,
        public idTechRider: number,
        public fechaSolicitud: Date,
        public turno: string,
        public modalidad: string,
        public acreditacionLinkedIn: string,
        public idCurso: number,
        public idProvincia: number
    ) {}
}
