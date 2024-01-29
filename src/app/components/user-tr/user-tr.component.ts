import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user-tr',
  templateUrl: './user-tr.component.html',
  styleUrls: ['./user-tr.component.css'],
})
export class UserTrComponent implements OnInit {
  error: string | null = null;
  provincia: any = {};
  editMode = false;
  token: string = '';
  user!: Usuario;
  editEmpresaCentro: boolean = false; // Variable para habilitar la edición de empresa o centro
  profesor: boolean = false;
  techrider: boolean = false;
  admin: boolean = false;
  responsable: boolean = false;
  empresas: any[] = [];
  centros: any[] = [];

  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private _serviceUser: UsuariosService) {} // Inyecta el servicio

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
    this.editForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      apellidos: [this.user.apellidos, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      telefono: [this.user.telefono, Validators.required],
      linkedIn: [this.user.linkedIn],
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;

    // Reset the form when exiting edit mode
    if (!this.editMode) {
      this.inicializarFormulario();
    }
  }

  editarPerfil(): void {
    // Implementa la lógica para guardar los cambios aquí
    console.log('Guardando cambios:', this.editForm.value);
    // Si es necesario, puedes recargar los datos después de guardar

    this.editMode = false; // Vuelve al modo de visualización después de guardar
  }
}
