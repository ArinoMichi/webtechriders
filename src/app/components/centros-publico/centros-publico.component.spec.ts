import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosPublicoComponent } from './centros-publico.component';

describe('CentrosPublicoComponent', () => {
  let component: CentrosPublicoComponent;
  let fixture: ComponentFixture<CentrosPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentrosPublicoComponent]
    });
    fixture = TestBed.createComponent(CentrosPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
