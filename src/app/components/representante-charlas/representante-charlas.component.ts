import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Charla } from 'src/app/models/charla.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CharlasService } from 'src/app/services/charlas.service';

@Component({
  selector: 'app-representante-charlas',
  templateUrl: './representante-charlas.component.html',
  styleUrls: ['./representante-charlas.component.css']
})
export class RepresentanteCharlasComponent implements OnInit{

  public user!: Usuario
  public charlas: any[] = []

  constructor(
    private _serviceCharlas: CharlasService,
    private _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Llamada al servicio para obtener los datos
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._serviceCharlas.getCharlasTechRider(id).subscribe(
      (result) => {
        // Asigna los datos obtenidos a la propiedad 'datos'
        this.charlas = result;
        console.log(this.charlas);
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  })
}
}
