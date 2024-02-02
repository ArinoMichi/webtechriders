import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteCharlasComponent } from './representante-charlas.component';

describe('RepresentanteCharlasComponent', () => {
  let component: RepresentanteCharlasComponent;
  let fixture: ComponentFixture<RepresentanteCharlasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentanteCharlasComponent]
    });
    fixture = TestBed.createComponent(RepresentanteCharlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
