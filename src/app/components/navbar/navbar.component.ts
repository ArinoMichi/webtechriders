import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isAuthenticated: boolean = false;
  public token: any

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    this.token = localStorage.getItem('token')
  }

  logout(): void {
    // Llamar al método de logout del servicio
    localStorage.removeItem('token')
    this._router.navigate(['/login']);
  }
}
