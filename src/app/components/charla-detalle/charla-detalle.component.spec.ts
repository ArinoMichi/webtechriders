import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlaDetalleComponent } from './charla-detalle.component';

describe('CharlaDetalleComponent', () => {
  let component: CharlaDetalleComponent;
  let fixture: ComponentFixture<CharlaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharlaDetalleComponent]
    });
    fixture = TestBed.createComponent(CharlaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
