import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { CharlasService } from 'src/app/services/charlas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

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
  constructor(private serviceCharlas: CharlasService, private _UserService: UsuariosService) {}

  ngOnInit(): void {
    // Llama al método para obtener los datos al cargar el componente
    this.getTechRider();
  }

  editarItem(index: number): void {
    // Lógica para editar el ítem en el índice dado
    console.log('Editar ítem en el índice', index);
  }

  eliminarItem(index: number): void {
    // Lógica para eliminar el ítem en el índice dado
    
  }

  getTechRider(): void {
    var token = localStorage.getItem('token');
    if (token != null) {
      this._UserService.getPerfilUsuario(token).subscribe((result) => {
        // Ajusta la propiedad 'user' con la respuesta del servicio
        this.user = {
          idUsuario: result.idUsuario,
          nombre: result.nombre,
          apellidos: result.apellidos,
          email: result.email,
          telefono: result.telefono,
          linkedIn: result.linkedIn,
          password: result.password,
          idRole: result.idRole,
          idProvincia: result.idProvincia,
          idEmpresaCentro: result.idEmpresaCentro,
          estado: result.estado,
        };
        this.cargarDatos();
      });
    }
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
    this.serviceCharlas.getCharlas().subscribe((result)=>{
      this.charlasDisponibles = result;
    })
  }
}
