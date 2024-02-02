import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { CharlasService } from 'src/app/services/charlas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor-charlas',
  templateUrl: './profesor-charlas.component.html',
  styleUrls: ['./profesor-charlas.component.css']
})
export class ProfesorCharlasComponent {
  public user!: Usuario;
  public charlas: any[] = [];
  public token: any;
  
  constructor(
    private _charlasService: CharlasService
    ) {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('identity') || '{}');
  }

  ngOnInit(): void {
    // Llama al método para obtener los datos al cargar el componente
    this.cargarDatos();
  }

  eliminarCharla(index: number): void {
    Swal.fire({
      title: '¿Estas seguro de eliminar la charla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const charlaSeleccionada = this.charlas[index];
        const idCharla = charlaSeleccionada.idCharla;
        this._charlasService.deleteCharla(idCharla, this.token).subscribe(
          (result) => {
            Swal.fire({
              title: 'Aceptado',
              text: 'La charla ha sido eliminada.',
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

  cargarDatos(): void {
    // Llamada al servicio para obtener los datos
    this._charlasService.getCharlasProfesor(this.user.idUsuario).subscribe(response => {
      this.charlas = response
    })
  }
}
