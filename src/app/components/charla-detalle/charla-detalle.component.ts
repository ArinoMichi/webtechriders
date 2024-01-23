import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharlasService } from 'src/app/services/charlas.service';
import { Charla } from 'src/app/models/charla.model';
import { EmpresaTechRider } from 'src/app/models/empresa-techrider';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-charla-detalle',
  templateUrl: './charla-detalle.component.html',
  styleUrls: ['./charla-detalle.component.css'],
})
export class CharlaDetalleComponent implements OnInit {
  private idTechRider = this.data.idTechRider;

  public charlas!: Array<Charla>;
  public techrider!: EmpresaTechRider;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _charlasService: CharlasService,
    private _usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.getTechRider();
  }

  getTechRider(): void {
    // var token = localStorage.getItem('token');
    if (this.idTechRider != null) {
      this._usuarioService
        .findEmpresaTechRider(this.idTechRider)
        .subscribe((response) => {
          this.techrider = response[0];
          console.log(this.techrider);
          console.log(this.data);
        });
    }
  }
}
