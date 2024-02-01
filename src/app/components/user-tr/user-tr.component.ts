import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user-tr',
  templateUrl: './user-tr.component.html',
  styleUrls: ['./user-tr.component.css'],
})
export class UserTrComponent implements OnInit {
  provincia: string = '';
  editMode = false;
  token: string = '';
  user!: Usuario;
  profesor: boolean = false;
  techrider: boolean = false;
  admin: boolean = false;
  responsable: boolean = false;
  provincias: any[] = [];
  empresas: any[] = [];
  centros: any[] = [];
  idEmpresaCentroSeleccionado!: number;
  provinciaNueva!: number;

  constructor(
    private _serviceEmpresasCentros: EmpresasCentrosService,
    private _serviceProvincias: ProvinciasService,
    private _serviceUsuario: UsuariosService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    this.user = JSON.parse(localStorage.getItem('identity') || '{}');
    switch (this.user.idRole) {
      case 1:
        this.admin = true;
        break;
      case 2:
        this.profesor = true;
        break;
      case 3:
        this.techrider = true;
        break;
      case 4:
        this.responsable = true;
        break;
      default:
        break;
    }
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this._serviceEmpresasCentros.getEmpresas().subscribe((result) => {
      this.empresas = result;
    });
    console.log(this.empresas);
    this._serviceEmpresasCentros.getCentros().subscribe((result)=>{
      this.centros = result;
    })

    this._serviceProvincias.getProvincia(this.user.idProvincia).subscribe((result) => {
      this.provincia = result.nombreProvincia;
    });
    this._serviceProvincias.getProvincias().subscribe((result)=>{
      this.provincias = result;
    })
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  onEmpresaCentroChange(event: any) {
    this.idEmpresaCentroSeleccionado = parseInt(event.target.value);
  }
  onProvinciaChange(event: any) {
    this.provinciaNueva = parseInt(event.target.value);
  }

  getNombreCentro(idEmpresaCentro: number): string {
    const centro = this.centros.find((c) => c.idEmpresaCentro === idEmpresaCentro);
    return centro ? centro.nombre : '';
  }
  getNombreEmpresa(idEmpresaCentro: number): string {
    const empresa = this.empresas.find((e) => e.idEmpresaCentro === idEmpresaCentro);
    return empresa ? empresa.nombre : '';
  }

  guardarCambios() {
    console.log(this.provinciaNueva )
    // Obtener los valores de los campos del formulario
    const idUsuario = this.user.idUsuario; 
    const nombre = this.user.nombre;
    const apellidos = this.user.apellidos;
    const email = this.user.email;
    const telefono = this.user.telefono;
    const linkedIn = this.user.linkedIn;
    const password = this.user.password; 
    const idRole = this.user.idRole; 
    var idProvincia = this.user.idProvincia;
    var idEmpresaCentro = this.user.idEmpresaCentro;
    if (this.provinciaNueva != null && this.provinciaNueva != 0) {
      idProvincia = this.provinciaNueva 
    }
    if (this.idEmpresaCentroSeleccionado != null && this.idEmpresaCentroSeleccionado != 0) {
      idEmpresaCentro = this.idEmpresaCentroSeleccionado; 
    }
    const estado = this.user.estado; 

    // Construir el objeto Usuario
    const usuario = new Usuario(
      idUsuario,
      nombre,
      apellidos,
      email,
      telefono,
      linkedIn,
      password,
      idRole,
      idProvincia,
      idEmpresaCentro,
      estado
    );
      console.log(usuario)

      this._serviceUsuario.updateUsuario(usuario, this.token).subscribe((result)=>{
        console.log(result)
      })
      
  }
}

