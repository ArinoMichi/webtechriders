// calendario.component.ts
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

import { CharlasService } from 'src/app/services/charlas.service';

import { Charla } from 'src/app/models/charla.model';

interface MyCalendarEvent extends CalendarEvent {
  charla: Charla;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  public charlas!: Array<Charla>;

  constructor(
    private _charlasService: CharlasService
  ) { }

  viewDate: Date = new Date();
  events: MyCalendarEvent[] = [];

  ngOnInit(): void {
    this._charlasService.getCharlas().subscribe((response) => {
      this.charlas = response;
      this.mapCharlasToEvents();
    });
  }

  mapCharlasToEvents(): void {
    this.events = this.charlas.map(charla => ({
      title: charla.descripcion,
      start: new Date(charla.fechaCharla),
      end: new Date(charla.fechaCharla),
      charla: charla,
    }));
  }

  dayClicked(day: CalendarMonthViewDay): void {
    console.log('Día clickeado', day);
  }

  eventClicked(event: { event: CalendarEvent<any> }): void {
    console.log('Evento clickeado', event);
    // Intentaremos acceder a la propiedad charla dentro del método
    if ('charla' in event.event) {
      const charlaSeleccionada: Charla = (event.event as MyCalendarEvent).charla;
      // Hacer algo con la Charla seleccionada...
    }
  }
}
