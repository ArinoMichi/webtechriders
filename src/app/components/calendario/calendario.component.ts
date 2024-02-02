import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

import { TecnologiasTechRidersService } from 'src/app/services/tecnologias-tech-riders.service';
import { CharlasService } from 'src/app/services/charlas.service';

import { MatDialog } from '@angular/material/dialog';
import { CharlaDetalleComponent } from 'src/app/components/charla-detalle/charla-detalle.component';
import { CharlaDetalles } from 'src/app/models/charla-detalles';
import { LOCALE_ID } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';
import { TecnologiaTechRiders } from 'src/app/models/tecnologia-tech-riders.model';


interface MyCalendarEvent extends CalendarEvent {
  charla: CharlaDetalles;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class CalendarioComponent implements OnInit {
  public charlas!: Array<CharlaDetalles>;
  viewDate: Date = new Date(); // Inicializamos con la fecha actual
  events: MyCalendarEvent[] = [];
  tencnologiasTechRider!: Array<TecnologiaTechRiders>;
  user!: Usuario;
  token: string = '';

  constructor(
    private _TecnologiasTechRidersService: TecnologiasTechRidersService,
    private _charlasService: CharlasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    this.user = JSON.parse(localStorage.getItem('identity') || '{}');

    switch (this.user.idRole) {
      case 2:
        this._charlasService.getCharlasProfesor(this.user.idUsuario).subscribe((techRiderResponse) => {
          this.charlas = techRiderResponse;
          this.mapCharlasToEvents();
        });
        
        break
      case 3:
        this._charlasService.getCharlasTechRider(this.user.idUsuario).subscribe((techRiderResponse) => {
          this.charlas = techRiderResponse;

          this._charlasService.getCharlasPendientesTecnologiasTechrider(this.token).subscribe((estadoResponse) => {
            // Concatenar las charlas de tech rider con las charlas de estado
            this.charlas = this.charlas.concat(estadoResponse);
            this.mapCharlasToEvents();
          });
        });
        break;
      case 4:
        this._charlasService.getCharlasTechRider(this.user.idUsuario).subscribe((techRiderResponse) => {
          this.charlas = techRiderResponse;

          this._charlasService.getCharlasEmpresa(this.user.idEmpresaCentro).subscribe((estadoResponse) => {
            // Concatenar las charlas de tech rider con las charlas de estado
            this.charlas = this.charlas.concat(estadoResponse);
            this.mapCharlasToEvents();
          });
        });
        break;

      default:
        // Otros roles de usuario
        this._charlasService.getCharlasDetalles().subscribe((detallesResponse) => {
          this.charlas = detallesResponse;
          this.mapCharlasToEvents();
        });
        break;
    }

  }

  mapCharlasToEvents(): void {
    this.events = this.charlas.map((charla) => {
      let color: any;
      switch (charla.idEstadoCharla) {
        case 1:
          color = { primary: '#888888', secondary: 'lightgray' };
          break;
        case 2:
          color = { primary: '#ffc400', secondary: 'lightorange' };
          break;
        case 3:
          color = { primary: '#88cfff', secondary: 'lightblue' };
          break;
        case 4:
          color = { primary: '#2ECC71', secondary: 'lightgreen' };
          break;
        case 5:
          color = { primary: '#9B59B6', secondary: 'lightpurple' };
          break;
        default:
          color = { primary: 'black', secondary: 'lightgray' };
          break;
      }

      return {
        title: charla.descripcionCharla,
        start: new Date(charla.fechaCharla),
        end: new Date(charla.fechaCharla),
        charla: charla,
        color: color,
      } as MyCalendarEvent;
    });
  }

  dayClicked(day: CalendarMonthViewDay): void {
    console.log('Día clickeado', day);
    const charlaSeleccionada = this.charlas.find(
      (charla) =>
        new Date(charla.fechaCharla).getDate() === day.date.getDate() &&
        new Date(charla.fechaCharla).getMonth() === day.date.getMonth() &&
        new Date(charla.fechaCharla).getFullYear() === day.date.getFullYear()
    );

    if (charlaSeleccionada) {
      this.openDialog(charlaSeleccionada);
    } else {
      console.log('No hay Charla para esta fecha.');
    }
  }

  eventClicked(event: { event: CalendarEvent }): void {
    console.log('Evento clickeado', event);
    if ('charla' in event.event) {
      const charlaSeleccionada: CharlaDetalles = (
        event.event as MyCalendarEvent
      ).charla;
      this.openDialog(charlaSeleccionada);
    } else {
      console.log('No hay Charla asociada a este evento.');
    }
  }

  openDialog(charla: CharlaDetalles): void {
    const dialogRef = this.dialog.open(CharlaDetalleComponent, {
      width: '50%',
      data: charla,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Cuadro de diálogo cerrado');
    });
  }

  // Método para cambiar al mes anterior
  prevMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() - 1,
      1
    );
    this.mapCharlasToEvents();
  }

  // Método para cambiar al próximo mes
  nextMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1,
      1
    );
    this.mapCharlasToEvents();
  }
}