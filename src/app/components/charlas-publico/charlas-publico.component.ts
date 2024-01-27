import { Component, OnInit } from '@angular/core';
import { CharlaQT } from 'src/app/models/charlaQT.model';
import { ValoracionCharla } from 'src/app/models/valoracion-charla.model';
import { CharlasService } from 'src/app/services/charlas.service';
import { ValoracionesCharlasService } from 'src/app/services/valoraciones-charlas.service';

@Component({
  selector: 'app-charlas-publico',
  templateUrl: './charlas-publico.component.html',
  styleUrls: ['./charlas-publico.component.css'],
})
export class CharlasPublicoComponent {
  public charlas!: Array<CharlaQT>;
  public allCharlas!: Array<CharlaQT>;
  public valoraciones!: Array<ValoracionCharla>;
  public selectedOption: string = '';

  constructor(
    private _charlasService: CharlasService,
    private _valoracionesService: ValoracionesCharlasService
  ) {}

  ngOnInit(): void {
    this.getCharlas();

    this._valoracionesService
      .getValoracionesCharlas()
      .subscribe((response: Array<ValoracionCharla>) => {
        this.valoraciones = response;
        console.log(this.valoraciones);
      });
  }

  getCharlas() {
    this._charlasService
      .getCharlasDetalles()
      .subscribe((response: Array<CharlaQT>) => {
        if (!this.allCharlas) {
          this.allCharlas = response;
        }
        this.charlas = this.allCharlas;
      });
  }

  filterByState(state: number) {
    return (this.charlas = this.allCharlas.filter(
      (charla) => charla.idEstadoCharla === state
    ));
  }

  filterAll() {
    this.charlas = this.allCharlas;
    this.selectedOption = 'Todas';
  }

  filterCompleted() {
    this.charlas = this.filterByState(5);
    this.selectedOption = 'Completas';
  }

  filterPending() {
    this.charlas = this.filterByState(2);
    this.selectedOption = 'Pendientes';
  }

  filterInProcess() {
    this.charlas = this.filterByState(3);
    this.selectedOption = 'En proceso';
  }
}
