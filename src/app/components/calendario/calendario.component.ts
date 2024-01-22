import { Component } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    // Tu lista de eventos aquí
  ];

  dayClicked(day: CalendarMonthViewDay): void {
    // Acciones al hacer clic en un día
    console.log('Día clickeado', day);
  }
}
