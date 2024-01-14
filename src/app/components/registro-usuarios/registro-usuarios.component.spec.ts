import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuariosComponent } from './registro-usuarios.component';

describe('RegistroUsuariosComponent', () => {
  let component: RegistroUsuariosComponent;
  let fixture: ComponentFixture<RegistroUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroUsuariosComponent]
    });
    fixture = TestBed.createComponent(RegistroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
