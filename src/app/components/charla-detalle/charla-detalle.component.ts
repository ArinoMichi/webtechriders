import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-charla-detalle',
  templateUrl: './charla-detalle.component.html',
  styleUrls: ['./charla-detalle.component.css']
})
export class CharlaDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
