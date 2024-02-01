import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorCharlasComponent } from './profesor-charlas.component';

describe('ProfesorCharlasComponent', () => {
  let component: ProfesorCharlasComponent;
  let fixture: ComponentFixture<ProfesorCharlasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorCharlasComponent]
    });
    fixture = TestBed.createComponent(ProfesorCharlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
