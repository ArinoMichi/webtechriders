import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesUsuariosComponent } from './peticiones-usuarios.component';

describe('PeticionesUsuariosComponent', () => {
  let component: PeticionesUsuariosComponent;
  let fixture: ComponentFixture<PeticionesUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeticionesUsuariosComponent]
    });
    fixture = TestBed.createComponent(PeticionesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
