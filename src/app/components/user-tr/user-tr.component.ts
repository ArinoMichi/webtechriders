import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-user-tr',
  templateUrl: './user-tr.component.html',
  styleUrls: ['./user-tr.component.css'],
})
export class UserTrComponent implements OnInit {
  error: string | null = null;
  editEmpresa: boolean = false;
  provincia: string = '';
  editMode = false;
  token: string = '';
  user!: Usuario;
  editEmpresaCentro: boolean = false;
  profesor: boolean = false;
  techrider: boolean = false;
  admin: boolean = false;
  responsable: boolean = false;
  empresas: any[] = [];
  centros: any[] = [];

  constructor(
    private _serviceEmpresasCentros: EmpresasCentrosService,
    private _serviceProvincias: ProvinciasService,
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
    this._serviceEmpresasCentros.getCentros().subscribe((result)=>{
      this.centros = result;
    })

    this._serviceProvincias.getProvincia(this.user.idProvincia).subscribe((result) => {
      this.provincia = result.nombreProvincia;
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  getNombreCentro(idEmpresaCentro: number): string {
    const centro = this.centros.find((c) => c.idEmpresaCentro === idEmpresaCentro);
    return centro ? centro.nombre : '';
  }
  getNombreEmpresa(idEmpresaCentro: number): string {
    const empresa = this.empresas.find((e) => e.idEmpresaCentro === idEmpresaCentro);
    console.log(empresa)
    return empresa ? empresa.nombre : '';
  }
  

  toggleEditEmpresa(): void {
    this.editEmpresa = !this.editEmpresa;
  }

  guardarEmpresa(): void {
    console.log('Guardando cambios en la empresa:', this.user);
    this.editMode = false;
    this.editEmpresa = false;
  }

  cancelarEditEmpresa(): void {
    this.editEmpresa = false;
  }

  editarPerfil(): void {
    console.log('Guardando cambios:', this.user);
    this.editMode = false;
  }
}
