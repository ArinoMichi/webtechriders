import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrPublicoComponent } from './tr-publico.component';

describe('TrPublicoComponent', () => {
  let component: TrPublicoComponent;
  let fixture: ComponentFixture<TrPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrPublicoComponent]
    });
    fixture = TestBed.createComponent(TrPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
