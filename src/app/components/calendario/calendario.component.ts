// calendario.component.ts
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { CharlasService } from 'src/app/services/charlas.service';
import { MatDialog } from '@angular/material/dialog';
import { CharlaDetalleComponent } from 'src/app/components/charla-detalle/charla-detalle.component';
import { Charla } from 'src/app/models/charla.model';
import { LOCALE_ID } from '@angular/core';

interface MyCalendarEvent extends CalendarEvent {
  charla: Charla;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class CalendarioComponent implements OnInit {
  public charlas!: Array<Charla>;
  viewDate: Date = new Date(); // Inicializamos con la fecha actual
  events: MyCalendarEvent[] = [];

  constructor(
    private _charlasService: CharlasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._charlasService.getCharlas().subscribe((response) => {
      this.charlas = response;
      this.mapCharlasToEvents();
    });
  }

  mapCharlasToEvents(): void {
    this.events = this.charlas.map(charla => {
      const hasTechRider = charla.idTechRider !== null && charla.idTechRider !== undefined;
  
      return {
        title: charla.descripcion,
        start: new Date(charla.fechaCharla),
        end: new Date(charla.fechaCharla),
        charla: charla,
        color: hasTechRider ? { primary: '#1e90ff', secondary: '#D1E8FF' } : { primary: '#FF0000', secondary: '#FFCCCC' },
      } as MyCalendarEvent;
    });
  }

  dayClicked(day: CalendarMonthViewDay): void {
    console.log('Día clickeado', day);
    const charlaSeleccionada = this.charlas.find(charla =>
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
      const charlaSeleccionada: Charla = (event.event as MyCalendarEvent).charla;
      this.openDialog(charlaSeleccionada);
    } else {
      console.log('No hay Charla asociada a este evento.');
    }
  }
  

  openDialog(charla: Charla): void {
    const dialogRef = this.dialog.open(CharlaDetalleComponent, {
      width: '400px',
      data: charla
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Cuadro de diálogo cerrado');
    });
  }

  // Método para cambiar al mes anterior
  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.mapCharlasToEvents();
  }

  // Método para cambiar al próximo mes
  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.mapCharlasToEvents();
  }
}
