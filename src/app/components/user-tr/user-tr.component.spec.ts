import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrComponent } from './user-tr.component';

describe('UserTrComponent', () => {
  let component: UserTrComponent;
  let fixture: ComponentFixture<UserTrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTrComponent]
    });
    fixture = TestBed.createComponent(UserTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
