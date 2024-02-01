import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesTecnologiasComponent } from './peticiones-tecnologias.component';

describe('PeticionesTecnologiasComponent', () => {
  let component: PeticionesTecnologiasComponent;
  let fixture: ComponentFixture<PeticionesTecnologiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeticionesTecnologiasComponent]
    });
    fixture = TestBed.createComponent(PeticionesTecnologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
