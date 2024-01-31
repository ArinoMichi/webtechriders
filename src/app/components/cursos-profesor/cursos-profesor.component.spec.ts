import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosProfesorComponent } from './cursos-profesor.component';

describe('CursosProfesorComponent', () => {
  let component: CursosProfesorComponent;
  let fixture: ComponentFixture<CursosProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosProfesorComponent]
    });
    fixture = TestBed.createComponent(CursosProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
