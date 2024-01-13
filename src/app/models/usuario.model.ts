export class Usuario {
    constructor(
        public idUsuario: number,
        public nombre: string,
        public apellidos: string,
        public email: string,
        public telefono: string,
        public linkedIn: string,
        public password: string,
        public idRole: number,
        public idProvincia: number,
        public idEmpresaCentro: number,
        public estado: number
    ) {}
}
