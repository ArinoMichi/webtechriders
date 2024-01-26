import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneltrComponent } from './paneltr.component';

describe('PaneltrComponent', () => {
  let component: PaneltrComponent;
  let fixture: ComponentFixture<PaneltrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaneltrComponent]
    });
    fixture = TestBed.createComponent(PaneltrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
