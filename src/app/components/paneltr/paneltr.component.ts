import { Component, OnInit } from '@angular/core';
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
  user!: Usuario; // Ajusta la definición del tipo de Usuario según la respuesta del servicio
  charlasAsociadas: any[] = [];
  charlasDisponibles: any[] = [];
  constructor(private serviceCharlas: CharlasService) {}

  ngOnInit(): void {
    // Llama al método para obtener los datos al cargar el componente
    this.getTechRider();
  }

  detallesCharla(index: number): void {
    // Lógica para editar el ítem en el índice dado
    console.log('Editar ítem en el índice', index);
  }

  cancelarCharla(index: number): void {
    Swal.fire({
      title: '¿Estas seguro de cancelar la charla?',
       //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Aceptado',
          text: 'La charla ha sido cancelada.',
          icon: 'success',
        });
      }
    });
  }
  aceptarCharla(index: number): void {
    // Lógica para eliminar el ítem en el índice dado
  }

  getTechRider(): void {
    var token = localStorage.getItem('token');
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
    this.serviceCharlas.getCharlas().subscribe((result) => {
      var charlasAux = result;
      this.charlasDisponibles = result;
    });
  }
}
