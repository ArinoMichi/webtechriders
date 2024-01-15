import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isAuthenticated: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.isAuthenticated().subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  logout(): void {
    // Llamar al método de logout del servicio
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
