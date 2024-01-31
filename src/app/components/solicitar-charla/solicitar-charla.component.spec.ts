import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCharlaComponent } from './solicitar-charla.component';

describe('SolicitarCharlaComponent', () => {
  let component: SolicitarCharlaComponent;
  let fixture: ComponentFixture<SolicitarCharlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarCharlaComponent]
    });
    fixture = TestBed.createComponent(SolicitarCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
