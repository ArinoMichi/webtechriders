import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesEmpresasComponent } from './peticiones-empresas.component';

describe('PeticionesEmpresasComponent', () => {
  let component: PeticionesEmpresasComponent;
  let fixture: ComponentFixture<PeticionesEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeticionesEmpresasComponent]
    });
    fixture = TestBed.createComponent(PeticionesEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
