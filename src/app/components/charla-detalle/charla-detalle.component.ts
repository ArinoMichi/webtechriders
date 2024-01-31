import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { TecnologiaCharla } from 'src/app/models/tecnologia-charla.model';
import { Tecnologia } from 'src/app/models/tecnologia.model';

import { TecnologiasCharlasService } from 'src/app/services/tecnologias-charlas.service';
import { TecnologiasService } from 'src/app/services/tecnologias.service';

@Component({
  selector: 'app-charla-detalle',
  templateUrl: './charla-detalle.component.html',
  styleUrls: ['./charla-detalle.component.css'],
})
export class CharlaDetalleComponent implements OnInit {

  public tecnologiaCharlas!: Array<TecnologiaCharla>;
  public tecnologiaCharlaNombres: Array<string> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CharlaDetalleComponent>,
    private _TecnologiasCharlasService: TecnologiasCharlasService,
    private _TecnologiasService: TecnologiasService,
  ) { }

  ngOnInit(): void {
    var idCharla = this.data.idCharla;

    this._TecnologiasCharlasService.getTecnologiaCharlaByCharla(idCharla).subscribe((response) => {
      this.tecnologiaCharlas = response;
      console.log(response);

      // Itera sobre las tecnologías y obtén los nombres
      for (let tec of this.tecnologiaCharlas) {
        this.getNombreTecnologia(tec.idTecnologia);
      }
    });
  }

  getNombreTecnologia(idTecnologia: number): void {
    this._TecnologiasService.getTecnologia(idTecnologia).subscribe((response) => {
      this.tecnologiaCharlaNombres.push(response.nombreTecnologia);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
