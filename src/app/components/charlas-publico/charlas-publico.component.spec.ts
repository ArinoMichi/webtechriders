import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlasPublicoComponent } from './charlas-publico.component';

describe('CharlasPublicoComponent', () => {
  let component: CharlasPublicoComponent;
  let fixture: ComponentFixture<CharlasPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharlasPublicoComponent]
    });
    fixture = TestBed.createComponent(CharlasPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
