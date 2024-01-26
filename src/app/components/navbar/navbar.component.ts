import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  public token: any
  public identity: any

  constructor(
    private _router: Router,
  ) {
    this.loadUser()
   }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.loadUser()
  }

  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}')
    this.token = localStorage.getItem('token')
  }

  logout(): void {
    // Llamar al método de logout del servicio
    localStorage.removeItem('token')
    localStorage.removeItem('identity')
    this._router.navigate(['/login']);
  }
}
