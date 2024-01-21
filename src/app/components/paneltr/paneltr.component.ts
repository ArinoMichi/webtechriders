import { Component } from '@angular/core';

@Component({
  selector: 'app-paneltr',
  templateUrl: './paneltr.component.html',
  styleUrls: ['./paneltr.component.css']
})
export class PaneltrComponent {
  datos = [
    { dato1: 'Valor 1', dato2: 'Valor 2', dato3: 'Valor 3' },
    // Agrega más filas según tus datos
  ];
  editarItem(index: number): void {
    // Lógica para editar el ítem en el índice dado
    console.log('Editar ítem en el índice', index);
  }

  eliminarItem(index: number): void {
    // Lógica para eliminar el ítem en el índice dado
    console.log('Eliminar ítem en el índice', index);
    this.datos.splice(index, 1);
  }
}
