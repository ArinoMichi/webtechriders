import { Component, OnInit } from '@angular/core';
import { Tecnologia } from 'src/app/models/tecnologia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { TecnologiasTechRidersService } from 'src/app/services/tecnologias-tech-riders.service';
import { TecnologiasService } from 'src/app/services/tecnologias.service';
import { PeticionesTecnologiasService } from 'src/app/services/peticiones-tecnologias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

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
  tecnologias!: Tecnologia[];
  tecnologiasTechRiders!: any[];
  idEmpresaCentroSeleccionado!: number;
  provinciaNueva!: number;
  identity: any

  constructor(
    private _serviceEmpresasCentros: EmpresasCentrosService,
    private _serviceProvincias: ProvinciasService,
    private _serviceUsuario: UsuariosService,
    private _serviceTecnologias: TecnologiasService,
    private _serviceTecnologiaTechRider: TecnologiasTechRidersService,
    private _PeticionesTecnologiasService: PeticionesTecnologiasService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
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

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('identity') || '{}')
    this.token = localStorage.getItem('token') ?? '';
  }

  inicializarFormulario(): void {
    this._serviceEmpresasCentros.getEmpresas().subscribe((result) => {
      this.empresas = result;
    });
    console.log(this.empresas);
    this._serviceEmpresasCentros.getCentros().subscribe((result) => {
      this.centros = result;
    })

    this._serviceProvincias.getProvincia(this.user.idProvincia).subscribe((result) => {
      this.provincia = result.nombreProvincia;
    });
    this._serviceProvincias.getProvincias().subscribe((result) => {
      this.provincias = result;
    })
    this._serviceTecnologias.getTecnologias().subscribe((result) => {
      this.tecnologias = result;
    })
    this._serviceTecnologiaTechRider.getTecnologiasTechRidersDetalles(this.user.idUsuario).subscribe((result) => {
      this.tecnologiasTechRiders = result;
      console.log(this.tecnologiasTechRiders);
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
    console.log(this.provinciaNueva)
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

    this._serviceUsuario.updateUsuario(usuario, this.token).subscribe((result) => {
      console.log(result)
      this._serviceUsuario.getPerfilUsuario(this.token).subscribe((response) => {
        this.identity = response
        localStorage.setItem('identity', JSON.stringify(this.identity))
      })
    })

    // aqui haz el put asdhajsd
    this.addTecnologiasTechrider();
    this.ngOnInit();
    this.inicializarFormulario();
    this.toggleEditMode();
  }

  addTecnologiasTechrider(): void {
    var token = this.token;
    var idUser = this.user.idUsuario;

    const checkboxes = document.querySelectorAll('input[name="tecnologias"]:checked');

    checkboxes.forEach((checkbox: any) => {
      const tecnologiaId = parseInt(checkbox.value);

      // Utilizar el servicio TecnologiasService para agregar tecnología al usuario
      this._serviceTecnologias
        .postTecnologiaTechrider(idUser, tecnologiaId, token)
        .subscribe((response) => {
          console.log(
            `Añadiendo tecnología ${tecnologiaId} al usuario ${idUser}`,
            response
          );
        });
    });
  }

  nuevaTecnologia(): void {
    Swal.fire({
      title: '¿Qué tecnología quieres solicitar?',
      icon: 'question',
      input: 'text',  
      inputLabel: 'Nombre de la tecnología',
      showCancelButton: true,
      confirmButtonText: 'Sí, solicitar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        return !value && 'Por favor, ingresa un nombre para la tecnología';
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const tecnologiaNombre = result.value as string;
        
        this._PeticionesTecnologiasService
          .postPeticionTecnologias(tecnologiaNombre, this.token)
          .subscribe(() => {
            console.log('Tecnología solicitada.');
            Swal.fire('¡Tecnología solicitada!', '', 'success');
          });
      }
    });
  }
}