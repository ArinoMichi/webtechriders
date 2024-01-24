import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasPublicoComponent } from './empresas-publico.component';

describe('EmpresasPublicoComponent', () => {
  let component: EmpresasPublicoComponent;
  let fixture: ComponentFixture<EmpresasPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresasPublicoComponent]
    });
    fixture = TestBed.createComponent(EmpresasPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
