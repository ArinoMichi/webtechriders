import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-tr',
  templateUrl: './user-tr.component.html',
  styleUrls: ['./user-tr.component.css'],
})
export class UserTrComponent implements OnInit {
  error: string | null = null;
  informacion: any = {};
  provincia: any = {};
  editMode = false;

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.inicializarFormulario();
  }

  cargarDatos(): void {
    // Simula la carga de datos (reemplaza con tus llamadas reales al servicio)
    this.informacion = {
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      email: 'correo@example.com',
      telefono: '123456789',
      linkedIn: 'linkedin.com/in/ejemplo',
    };

    this.provincia = {
      nombreProvincia: 'Provincia Ejemplo',
    };
  }

  inicializarFormulario(): void {
    this.editForm = this.fb.group({
      nombre: [this.informacion.nombre, Validators.required],
      apellidos: [this.informacion.apellidos, Validators.required],
      email: [this.informacion.email, [Validators.required, Validators.email]],
      telefono: [this.informacion.telefono, Validators.required],
      linkedIn: [this.informacion.linkedIn],
      nombreProvincia: [this.provincia.nombreProvincia, Validators.required],
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
    this.cargarDatos();
    this.editMode = false; // Vuelve al modo de visualización después de guardar
  }
}
