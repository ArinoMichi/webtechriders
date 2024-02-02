import { Component, OnInit } from '@angular/core';
import { Charla } from 'src/app/models/charla.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CharlasService } from 'src/app/services/charlas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paneltr',
  templateUrl: './paneltr.component.html',
  styleUrls: ['./paneltr.component.css'],
})
export class PaneltrComponent implements OnInit {
  nombreUsuario!: string;
  user!: Usuario;
  charlasAsociadas: any[] = [];
  charlasDisponibles: any[] = [];
  token: string = '';
  charla!: any

  constructor(private serviceCharlas: CharlasService) {}

  ngOnInit(): void {
    // Llama al método para obtener los datos al cargar el componente
    this.getTechRider();
  }

  detallesCharla(index: number): void {
    const charlaSeleccionada = this.charlasAsociadas[index];
    const idCharla = charlaSeleccionada.idCharla;
    this.serviceCharlas.getCharlaDetalles(idCharla).subscribe(
      (charla: any) => {
        const detallesUsuario = `
          <strong>Descripcion:</strong> ${charla.descripcionCharla}<br>
          <strong>Fecha:</strong> ${charla.fechaCharla}<br>
          <strong>Estado:</strong> ${charla.estadoCharla}<br>
          <strong>TechRider:</strong> ${charla.techRider}<br>
          <strong>Modalidad:</strong> ${charla.modalidad}<br>
          <strong>Curso:</strong> ${charla.nombreCurso}<br>
          <strong>Provincia:</strong> ${charla.provincia}<br>
          <!-- Agrega más detalles según sea necesario -->
        `;

        Swal.fire({
          title: 'Detalles del Usuario',
          html: detallesUsuario,
          confirmButtonText: 'Cerrar'
        });
      },
      (error) => {
        console.error('Error al obtener detalles del usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la información del usuario.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  cancelarCharla(index: number): void {
    Swal.fire({
      title: '¿Estas seguro de cancelar la charla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const charlaSeleccionada = this.charlasAsociadas[index];
        const idCharla = charlaSeleccionada.idCharla;
        this.serviceCharlas.associateTechRider(0, idCharla, this.token).subscribe(
          (result) => {
            Swal.fire({
              title: 'Aceptado',
              text: 'La charla ha sido cancelada.',
              icon: 'success',
            });
            this.cargarDatos();
          },
          (error) => {
            Swal.fire({
              title: 'Ha habido un problema',
              text: 'Intentalo de nuevo mas tarde.',
              icon: 'error',
            });
          }
        );
        
      }
    });
  }
  aceptarCharla(index: number): void {
    Swal.fire({
      title: '¿Estas seguro de aceptar la charla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const charlaAceptar = this.charlasDisponibles[index];
        const idCharla = charlaAceptar.idCharla;
        this.serviceCharlas.associateTechRider(this.user.idUsuario, idCharla, this.token).subscribe(
          (result) => {
            Swal.fire({
              title: 'Aceptado',
              text: 'La charla ha sido aceptada.',
              icon: 'success',
            });
            this.cargarDatos();
          },
          (error) => {
            Swal.fire({
              title: 'Ha habido un problema',
              text: 'Intentalo de nuevo mas tarde.',
              icon: 'error',
            });
          }
        );
        
      }
    });
  }

  getTechRider(): void {
    this.token = localStorage.getItem('token') ?? '';
    this.user = JSON.parse(localStorage.getItem('identity') || '{}');
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Llamada al servicio para obtener los datos
    this.serviceCharlas.getCharlasTechRider(this.user.idUsuario).subscribe(
      (result) => {
        // Asigna los datos obtenidos a la propiedad 'datos'
        this.charlasAsociadas = result;
        console.log(this.charlasAsociadas);
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
    this.serviceCharlas.getCharlasPendientesTecnologiasTechrider(this.token).subscribe((result) => {
      this.charlasDisponibles = result;
      console.log(this.charlasDisponibles);
    });
  }
}
