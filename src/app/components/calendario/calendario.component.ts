// calendario.component.ts
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { CharlasService } from 'src/app/services/charlas.service';
import { MatDialog } from '@angular/material/dialog';
import { CharlaDetalleComponent } from 'src/app/components/charla-detalle/charla-detalle.component';
import { CharlaDetalles } from 'src/app/models/charla-detalles';
import { LOCALE_ID } from '@angular/core';

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

  constructor(
    private _charlasService: CharlasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._charlasService.getCharlasDetalles().subscribe((response) => {
      this.charlas = response;
      this.mapCharlasToEvents();
    });
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
