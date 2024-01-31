import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'webtechriders';

  localStorageContent: string | null = null;

  ngOnInit() {
    // Verifica si hay contenido en el localStorage
    this.localStorageContent = localStorage.getItem('identity');
  }

  ngDoCheck(): void {
    this.localStorageContent = localStorage.getItem('identity');
  }
}
