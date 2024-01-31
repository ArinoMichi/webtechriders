import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPublicoComponent } from './navbar-publico.component';

describe('NavbarPublicoComponent', () => {
  let component: NavbarPublicoComponent;
  let fixture: ComponentFixture<NavbarPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarPublicoComponent]
    });
    fixture = TestBed.createComponent(NavbarPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
