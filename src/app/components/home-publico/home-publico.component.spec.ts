import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicoComponent } from './home-publico.component';

describe('HomePublicoComponent', () => {
  let component: HomePublicoComponent;
  let fixture: ComponentFixture<HomePublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePublicoComponent]
    });
    fixture = TestBed.createComponent(HomePublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
