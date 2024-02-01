export class Charla {
    constructor(
        public idCharla: number,
        public descripcion: string,
        public idEstadoCharla: number,
        public fechaCharla: any,
        public observaciones: string,
        public idTechRider: number | null,
        public fechaSolicitud: any,
        public turno: string,
        public modalidad: string,
        public acreditacionLinkedIn: string,
        public idCurso: number,
        public idProvincia: number
    ) {}
}
