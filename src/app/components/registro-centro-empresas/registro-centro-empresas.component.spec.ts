import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCentroEmpresasComponent } from './registro-centro-empresas.component';

describe('RegistroCentroEmpresasComponent', () => {
  let component: RegistroCentroEmpresasComponent;
  let fixture: ComponentFixture<RegistroCentroEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCentroEmpresasComponent]
    });
    fixture = TestBed.createComponent(RegistroCentroEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
